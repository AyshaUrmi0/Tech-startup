import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="text-white bg-gray-800">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
      
        <div>
          <Link to="/" className="text-2xl font-bold text-teal-400">
            TulipCrowd
          </Link>
        </div>

      
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-teal-300">
            Home
          </Link>
          <Link to="/campaigns" className="hover:text-teal-300">
            All Campaigns
          </Link>
          <Link to="/addCampaign" className="hover:text-teal-300">
            Add New Campaign
          </Link>
          <Link to="/myCampaigns" className="hover:text-teal-300">
            My Campaigns
          </Link>
          <Link to="/myDonations" className="hover:text-teal-300">
            My Donations
          </Link>
        </div>

        {/* Auth Links */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
