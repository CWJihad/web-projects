
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "@/context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();
  const { setUser } = getData();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setUser(response.data.user);

        setFormData({
          email: "",
          password: "",
        });

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (status === 401) {
          setStatus("unauthorized");
          setErrorMessage(message);
        } else if (status === 403) {
          setStatus("unverified");
          setErrorMessage(message);
        } else if (status === 404) {
          setStatus("notfound");
          setErrorMessage(message);
        } else {
          setStatus("error");
          setErrorMessage(message);
        }
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] font-sans px-4">

      <div className="bg-white p-10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] w-full max-w-[420px]">

        <h2 className="text-2xl font-bold mb-2 text-[#1a1a2e] text-center">
          Login 👋
        </h2>

        {/* Success Message */}
        {status === "success" && (
          <div className="bg-[#e6ffed] text-[#2d6a4f] p-3 rounded-lg mb-4 text-sm">
            ✅ Login successful.
          </div>
        )}

        {/* Unverified Message */}
        {status === "unverified" && (
          <div className="bg-[#ffe6e6] text-[#c0392b] p-3 rounded-lg mb-4 text-sm">
            ❌ {errorMessage}
          </div>
        )}

        {/* Unauthorized Message */}
        {status === "unauthorized" && (
          <div className="bg-[#ffe6e6] text-[#c0392b] p-3 rounded-lg mb-4 text-sm">
            ❌ {errorMessage}
          </div>
        )}

        {/* User Not Found */}
        {status === "notfound" && (
          <div className="bg-[#e6ffed] text-[#2d6a4f] p-3 rounded-lg mb-4 text-sm">
            👍 {errorMessage}
          </div>
        )}

        {/* General Error */}
        {status === "error" && (
          <div className="bg-[#ffe6e6] text-[#c0392b] p-3 rounded-lg mb-4 text-sm">
            ❌ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email Address */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#444] mb-1.5">
              Email Address
            </label>

            <input
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm outline-none box-border focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              type="email"
              name="email"
              placeholder="jone@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#444] mb-1.5">
              Password
            </label>

            <div className="flex items-center justify-center">
              <input
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm outline-none box-border focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                type={passShow ? "text" : "password"}
                name="password"
                placeholder="enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                onClick={() => setPassShow(!passShow)}
                className="ml-2.5 cursor-pointer"
              >
                {passShow ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="underline text-[13px] hover:text-orange-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full p-3 text-white border-none rounded-lg text-base font-semibold mt-2 transition-colors ${
              loading
                ? "bg-[#ccc] cursor-not-allowed"
                : "bg-[#ff6b35] cursor-pointer hover:bg-orange-600"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit →"}
          </button>

          {/* Register Link */}
          <div className="mt-[15px]">
            <span>
              I don't have an account?{" "}
              <Link
                to="/register"
                className="underline hover:text-orange-500"
              >
                Sign Up
              </Link>
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
