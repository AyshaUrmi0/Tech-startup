import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-white bg-gray-800">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto sm:px-6 lg:px-8">
      
        <div>
          <Link to="/" className="text-2xl font-bold text-teal-400">
            TechSpring
          </Link>
        </div>

       
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className="text-2xl text-teal-400 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      
        <div
          className={`flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6 absolute sm:relative sm:top-0 sm:left-0 sm:right-0 sm:w-full bg-gray-800 sm:bg-transparent transition-transform duration-300 ${
            isOpen ? 'translate-y-12' : '-translate-y-full sm:translate-y-0'
          }`}
        >
          {/* Nav Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
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

          {/* Auth Links */}
          <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:space-x-4 sm:mt-0">
            <Link
              to="/login"
              className="block px-4 py-2 text-center bg-teal-400 rounded-lg hover:text-teal-300"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 text-center bg-teal-400 rounded-lg hover:text-teal-300"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


