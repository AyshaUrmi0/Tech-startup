import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../Components/provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, theme, toggleTheme } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User logged out");
    } catch (error) {
      toast.error("Logout error:", error);
    }
  };

  return (
    <nav
      className={`navbar ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-base-100 text-black"
      } shadow-lg`}>
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-[1] ${
              isOpen ? "block" : "hidden"
            }`}>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/campaigns" onClick={() => setIsOpen(false)}>
                All Campaigns
              </Link>
            </li>
            <li>
              <Link to="/addCampaign" onClick={() => setIsOpen(false)}>
                Add New Campaign
              </Link>
            </li>
            <li>
              <Link to="/myCampaigns" onClick={() => setIsOpen(false)}>
                My Campaigns
              </Link>
            </li>
            <li>
              <Link to="/myDonations" onClick={() => setIsOpen(false)}>
                My Donations
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={handleLogout}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          TechSpring
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/campaigns">All Campaigns</Link>
          </li>
          <li>
            <Link to="/addCampaign">Add New Campaign</Link>
          </li>
          <li>
            <Link to="/myCampaigns">My Campaigns</Link>
          </li>
          <li>
            <Link to="/myDonations">My Donations</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:space-x-4 sm:mt-0">
          {user ? (
            <>
              {/* User Profile */}
              <div className="relative group">
                <img
                  src={user.photoURL || "/default-user.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute z-10 hidden w-32 px-4 py-2 mt-2 text-sm text-center text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                  {user.displayName || "User"}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-center rounded-lg ${
                  theme === "dark"
                    ? "bg-teal-400 hover:bg-teal-500"
                    : "bg-teal-600 hover:bg-teal-700 text-black"
                }`}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-4 py-2 text-center rounded-lg ${
                  theme === "dark"
                    ? "bg-teal-400 hover:bg-teal-500"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
                onClick={() => setIsOpen(false)}>
                Log In
              </Link>
              <Link
                to="/register"
                className={`block px-4 py-2 text-center rounded-lg ${
                  theme === "dark"
                    ? "bg-teal-400 hover:bg-teal-500"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
                onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="btn btn-ghost">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
