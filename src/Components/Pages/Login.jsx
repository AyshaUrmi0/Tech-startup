import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.config"; // Replace with your Firebase configuration
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Login Successful!");
    } catch (error) {
      toast.error("Google Login Failed.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="mt-4 btn-secondary">
        Login with Google
      </button>
      <p className="mt-2">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
