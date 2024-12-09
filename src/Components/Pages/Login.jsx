import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Login Successful!");
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                toast.success("Logged in with Google!");
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="flex items-center justify-center h-screen text-center">
            <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="mb-4 text-xl font-bold"><span className='text-black'> Login </span></h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 input input-bordered"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 input input-bordered"
                />
                <button type="submit" className="w-full mb-4 btn btn-primary">Login</button>
                <button type="button" onClick={handleGoogleLogin} className="w-full btn btn-outline">Login with Google</button>
                <p className="mt-4 text-sm">
                   <span className='text-black'> Don't have an account?</span> <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
