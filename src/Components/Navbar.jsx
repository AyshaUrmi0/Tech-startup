import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../Components/provider/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, theme, toggleTheme } = useAuth(); // Access theme state and toggle function from context

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav
      className={`${
        theme === 'dark' ? 'text-white' : 'text-black bg-white'
      } shadow-lg`}
    >
      <div className="container flex items-center justify-between px-4 py-3 mx-auto lg:px-8">
        {/* Brand Logo */}
        <div>
          <Link
            to="/"
            className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            TechSpring
          </Link>
        </div>

        {/* Theme Toggle and Hamburger Menu for Mobile */}
        <div className="flex items-center space-x-4 sm:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`text-2xl focus:outline-none ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className={`text-2xl focus:outline-none ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`fixed inset-x-0 top-16 z-50 flex flex-col items-center bg-white sm:bg-transparent sm:relative sm:flex-row sm:items-center sm:space-x-6 sm:top-0 sm:translate-y-0 transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full sm:translate-y-0'
          }`}
        >
          <div className="flex flex-col w-full sm:flex-row sm:items-center sm:space-x-6 sm:w-auto">
            <Link
              to="/"
              className={`block px-4 py-2 text-center ${
                theme === 'dark' ? 'hover:text-teal-300' : 'hover:text-teal-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/campaigns"
              className={`block px-4 py-2 text-center ${
                theme === 'dark' ? 'hover:text-teal-300' : 'hover:text-teal-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              All Campaigns
            </Link>
            <Link
              to="/addCampaign"
              className={`block px-4 py-2 text-center ${
                theme === 'dark' ? 'hover:text-teal-300' : 'hover:text-teal-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Add New Campaign
            </Link>
            <Link
              to="/myCampaigns"
              className={`block px-4 py-2 text-center ${
                theme === 'dark' ? 'hover:text-teal-300' : 'hover:text-teal-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              My Campaigns
            </Link>
            <Link
              to="/myDonations"
              className={`block px-4 py-2 text-center ${
                theme === 'dark' ? 'hover:text-teal-300' : 'hover:text-teal-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              My Donations
            </Link>
          </div>

          {/* Authentication Links */}
          <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:space-x-4 sm:mt-0">
            {user ? (
              <>
                {/* User Profile */}
                <div className="relative group">
                  <img
                    src={user.photoURL || '/default-user.png'}
                    alt="User"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <div className="absolute z-10 hidden w-32 px-4 py-2 mt-2 text-sm text-center text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                    {user.displayName || 'User'}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 text-center rounded-lg ${
                    theme === 'dark'
                      ? 'bg-teal-400 hover:bg-teal-500'
                      : 'bg-teal-600 hover:bg-teal-700 text-black'
                  }`}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-4 py-2 text-center rounded-lg ${
                    theme === 'dark'
                      ? 'bg-teal-400 hover:bg-teal-500'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className={`block px-4 py-2 text-center rounded-lg ${
                    theme === 'dark'
                      ? 'bg-teal-400 hover:bg-teal-500'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Theme Toggle for larger screens */}
        <div className="hidden sm:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`text-2xl focus:outline-none ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;