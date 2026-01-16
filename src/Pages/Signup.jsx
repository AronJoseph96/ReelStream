import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const isStrongPassword = (pwd) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return setError("Username is required");
    if (!email.trim()) return setError("Email is required");

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    if (!isStrongPassword(password)) {
      return setError("Password must be 8+ chars, include uppercase, lowercase, number & symbol");
    }

    const user = {
      name: name.trim(),
      email: email.trim(),
      password,
      role: "USER",
    };

    localStorage.setItem("reelstream_user", JSON.stringify(user));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center" style={{ paddingTop: "90px" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="mb-3 text-center">Create Account</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="form-control mb-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="form-control mb-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="form-control mb-3" placeholder="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

          <button className="btn btn-danger w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
