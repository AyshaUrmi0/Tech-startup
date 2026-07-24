import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../Components/provider/AuthProvider";
import { toast } from "react-toastify";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-teal-600 dark:text-teal-400 font-bold border-b-2 border-teal-500 py-1"
    : "hover:text-teal-600 dark:hover:text-teal-400 py-1 transition-colors";

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
    <nav className="navbar bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 shadow-md transition-colors duration-300">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden text-gray-800 dark:text-gray-200"
            onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
            className={`menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-box z-[9999] ${
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
        <Link to="/" className="text-xl font-bold text-teal-600 dark:text-teal-400 btn btn-ghost">
          TechSpring
        </Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal font-medium text-gray-700 dark:text-gray-200 space-x-6">
          <li>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/campaigns" className={navLinkClass}>All Campaigns</NavLink>
          </li>
          <li>
            <NavLink to="/addCampaign" className={navLinkClass}>Add New Campaign</NavLink>
          </li>
          <li>
            <NavLink to="/myCampaigns" className={navLinkClass}>My Campaigns</NavLink>
          </li>
          <li>
            <NavLink to="/myDonations" className={navLinkClass}>My Donations</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-3">
        <div className="flex-col hidden mt-4 md:flex sm:flex-row sm:items-center sm:space-x-3 sm:mt-0">
          {user ? (
            <>
              {/* User Profile */}
              <div className="relative group">
                <img
                  src={user.photoURL || "https://img.icons8.com/color/96/user-male-circle--v1.png"}
                  alt="User"
                  className="w-9 h-9 rounded-full cursor-pointer ring-2 ring-teal-500"
                />
                <div className="absolute right-0 z-10 hidden w-36 px-3 py-2 mt-2 text-xs font-semibold text-center text-white bg-gray-900 rounded-lg shadow-lg group-hover:block border border-gray-700">
                  {user.displayName || "User"}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-sm">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-sm"
                onClick={() => setIsOpen(false)}>
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-300 dark:border-gray-700 shadow-sm"
                onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="btn btn-ghost btn-circle text-amber-500 dark:text-teal-400 text-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
