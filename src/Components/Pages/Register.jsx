import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
            toast.error("Password must include uppercase, lowercase, and be at least 6 characters long.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL,
                });
                toast.success("Registration Successful!");
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleRegister} className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="mb-4 text-xl font-bold">Register</h2>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 input input-bordered"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 input input-bordered"
                />
                <input 
                    type="url" 
                    placeholder="Photo URL" 
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full mb-4 input input-bordered"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 input input-bordered"
                />
                <button type="submit" className="w-full mb-4 btn btn-primary">Register</button>
                <p className="mt-4 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
