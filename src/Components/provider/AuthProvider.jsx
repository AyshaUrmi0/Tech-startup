import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.int'; // your Firebase configuration

// Create Context
export const AuthContext = createContext(null);

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Add theme state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, logout, theme, toggleTheme }}>
      {/* Theme applied globally */}
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          {children}
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
