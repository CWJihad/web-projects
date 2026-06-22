import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const VerifyOtp = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // In VerifyOtp, read it at the top:

  const location = useLocation();
  const email = location.state?.email; // the email from ForgotPassword

  if (!email) {
    return <Navigate to={'/forgot-password'}/>
  }

  // Fix — consistent with ForgotPassword:
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        { email, otp: formData.otp },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        },
      );

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormData({ otp: "" });
        setTimeout(() => {
          navigate("/reset-password", {state: {verified: true}});
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (status === 400) {
          setStatus("unauthorized");
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
    <div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Verify OTP 👋</h2>

          {status === "success" && (
            <div style={styles.successMsg}>✅ OTP verified successfully </div>
          )}
          {status === "unauthorized" && (
            <div style={styles.errorMsg}>❌ {errorMessage}</div>
          )}
          {status === "error" && (
            <div style={styles.errorMsg}>❌ {errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="number"
                name="otp"
                placeholder="6 digit otp"
                value={formData.otp}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <button
              style={loading ? styles.buttonLoading : styles.button}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
    fontFamily: "sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#1a1a2e",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6b35",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
  buttonLoading: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
    marginTop: "8px",
  },
  successMsg: {
    backgroundColor: "#e6ffed",
    color: "#2d6a4f",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  errorMsg: {
    backgroundColor: "#ffe6e6",
    color: "#c0392b",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
};
