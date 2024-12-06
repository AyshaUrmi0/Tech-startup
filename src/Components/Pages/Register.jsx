import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config"; // Replace with your Firebase configuration
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!/(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(password)) {
      toast.error("Password must include uppercase, lowercase, and at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      toast.success("Registration Successful!");
    } catch (error) {
      toast.error("Registration Failed.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input"
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
          Register
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
