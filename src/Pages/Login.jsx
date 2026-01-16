import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = JSON.parse(localStorage.getItem("reelstream_admin"));
    const user = JSON.parse(localStorage.getItem("reelstream_user"));

    // Admin login
    if (admin && email === admin.email && password === admin.password) {
      login(admin);
      navigate("/admin/dashboard");
      return;
    }

    // Normal user login
    if (user && email === user.email && password === user.password) {
      login(user);
      navigate("/");
      return;
    }

    setError("Invalid email or password!");
  };

  return (
    <div className="container text-light" style={{ paddingTop: "90px", maxWidth: "400px" }}>
      <h3>Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-danger w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
