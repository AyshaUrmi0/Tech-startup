import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { getFriendlyErrorMessage } from '../../utils/firebaseErrors';

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
            .catch((err) => toast.error(getFriendlyErrorMessage(err)));
    };

    return (
        <div className="flex items-center justify-center min-h-[85vh] px-4 py-12">
            <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition-colors duration-300">
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">Create an Account</h2>
                
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Full Name</label>
                    <input 
                        type="text"  
                        placeholder="Enter your full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Photo URL</label>
                    <input 
                        type="url" 
                        placeholder="Enter your photo URL" 
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Password</label>
                    <input 
                        type="password" 
                        placeholder="Must include A-Z, a-z, and 6+ chars" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                        required
                    />
                </div>

                <button type="submit" className="w-full py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-md">
                    Register
                </button>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
