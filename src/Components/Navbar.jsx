import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../Components/provider/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Use context for authentication state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Use the logout function from AuthContext
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="text-white bg-gray-900 shadow-lg">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto lg:px-8">
        {/* Brand Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-teal-400">
            TechSpring
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className="text-2xl text-teal-400 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`fixed inset-x-0 top-16 z-50 flex flex-col items-center bg-gray-900 sm:relative sm:flex-row sm:items-center sm:space-x-6 sm:top-0 sm:translate-y-0 transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full sm:translate-y-0'
          }`}
        >
          {/* Main Nav Links */}
          <div className="flex flex-col w-full sm:flex-row sm:items-center sm:space-x-6 sm:w-auto">
            <Link
              to="/"
              className="block px-4 py-2 text-center hover:text-teal-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/campaigns"
              className="block px-4 py-2 text-center hover:text-teal-300"
              onClick={() => setIsOpen(false)}
            >
              All Campaigns
            </Link>
            <Link
              to="/addCampaign"
              className="block px-4 py-2 text-center hover:text-teal-300"
              onClick={() => setIsOpen(false)}
            >
              Add New Campaign
            </Link>
            <Link
              to="/myCampaigns"
              className="block px-4 py-2 text-center hover:text-teal-300"
              onClick={() => setIsOpen(false)}
            >
              My Campaigns
            </Link>
            <Link
              to="/myDonations"
              className="block px-4 py-2 text-center hover:text-teal-300"
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
                  className="px-4 py-2 text-center bg-teal-400 rounded-lg hover:bg-teal-500"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-center bg-teal-400 rounded-lg hover:bg-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-center bg-teal-400 rounded-lg hover:bg-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
