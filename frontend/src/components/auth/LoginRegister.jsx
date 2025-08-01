import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./LoginRegister.css";

const LoginRegister = () => {
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
            localStorage.setItem("username", data.name || "User");
  localStorage.setItem("student_id", data.student_id); // ✅ Store student ID

  if (data.role === "admin") {
    navigate("/teacher-dashboard");
  } else if (data.role === "student") {
    navigate("/student-dashboard");
  } else {
    alert("Unknown role.");
  }
}else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Login error. Please try again.");
      console.error("Login error:", err);
    }
  };

  // 📝 Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.text();

      if (res.ok) {
        alert("Registered successfully! You can now login.");
        setAction(""); // Switch to login view
      } else {
        alert("Registration failed: " + data);
      }
    } catch (err) {
      alert("Registration error. Try again.");
      console.error("Registration error:", err);
    }
  };

  const registerLink = () => setAction(" active");
  const loginLink = () => setAction("");

  return (
    <div className="login-page">
      <div className={`wrapper${action}`}>
        {/* LOGIN FORM */}
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" name="email" placeholder="Email" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forget">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forget password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* REGISTRATION FORM */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div className="input-box">
              <input type="text" name="name" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" required />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forget">
              <label>
                <input type="checkbox" /> I agree to the terms
              </label>
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
