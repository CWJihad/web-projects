import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // ✅ 'name' attribute on input must match state key exactly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      // ✅ Axios uses response.status, not response.ok
      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormData({ fullName: "", username: "", email: "", password: "" });
        navigate("/verify", { state: { fromRegister: true } });
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (status === 409) {
          setStatus("exist");
          setErrorMessage(message);
        } else {
          setStatus("error");
          setErrorMessage(message);
        }
      } else {
        // network error — server not reachable
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] w-full max-w-105">
        <h2 className="text-2xl font-bold mb-2 text-[#1a1a2e] text-center">
          Sign up 👋
        </h2>

        {status === "success" && (
          <div className="bg-[#e6ffed] text-[#2d6a4f] p-3 rounded-lg mb-4 text-sm">
            ✅ Registration is successful.
          </div>
        )}

        {status === "exist" && (
          <div className="bg-[#e6ffed] text-[#2d6a4f] p-3 rounded-lg mb-4 text-sm">
            👍 {errorMessage}
          </div>
        )}

        {status === "error" && (
          <div className="bg-[#ffe6e6] text-[#c0392b] p-3 rounded-lg mb-4 text-sm">
            ❌ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#444] mb-1.5">
              Full Name
            </label>

            <input
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm outline-none box-border focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              type="text"
              name="fullName"
              placeholder="Mr. Jone Paul"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#444] mb-1.5">
              Username
            </label>

            <input
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm outline-none box-border focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              type="text"
              name="username"
              placeholder="Jone"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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
            />
          </div>

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
          </div>


          <button
            className={`w-full p-3 text-white border-none rounded-lg text-base font-semibold mt-2 ${
              loading
                ? "bg-[#ccc] cursor-not-allowed"
                : "bg-[#ff6b35] cursor-pointer hover:bg-orange-600 transition-colors"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit →"}
          </button>


          <div className="mt-3.75">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="underline hover:text-orange-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
