import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      setUser({ username, password });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{
          marginLeft: "10px",
          border: "none",
          outline: "none",
          padding: "5px 15px",
          borderRadius: "8px",
          background: "lightseagreen",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Login
      </button>

      <br />
      <br />
    </div>
  );
};

export default Login;
