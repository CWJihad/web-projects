import React from "react";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ email: "", password: "" });
      } 
      else {
        setStatus("unsuccess");
      }
    } catch (err) {
      console.error("Register error:", err); // ← add this
      setStatus("error");
      return res.status(500).json({ message: err.message }); // ← and this
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login 👋</h2>

          {status === "success" && (
            <div style={styles.successMsg}>
              ✅ Login successful.
            </div>
          )}
          {status === "unsuccess" && (
            <div style={styles.successMsg}>
              👍 Please register your account.
            </div>
          )}
          {status === "error" && (
            <div style={styles.errorMsg}>
              ❌ Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="jone@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  style={styles.input}
                  type={passShow ? "text" : "password"}
                  name="password"
                  placeholder="enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setPassShow(!passShow)}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                  {passShow ? "🙈" : "👁️"}
                </span>
              </div>
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

export default Login;
