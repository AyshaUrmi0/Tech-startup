import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaPaperPlane, FaShieldAlt, FaRocket } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to TechSpring updates!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      
      {/* Top CTA Newsletter Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/60 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <FaRocket className="text-teal-600 dark:text-teal-400" />
              <span>Stay Ahead in Tech Innovation</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Subscribe to get curated weekly spotlights on breakthrough tech campaigns and founder stories.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 w-full md:w-72 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm transition-colors"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl transition-colors shadow-md flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <span>Subscribe</span>
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      </div>

      {/* Main 4-Column Navigation Layout */}
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Info (2 Columns Wide on Desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-teal-600 text-white font-bold text-xl rounded-xl">TS</div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">TechSpring</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
            Empowering tech founders, engineers, and visionaries to launch breakthrough projects through community crowdfunding.
          </p>
          
          <div className="flex items-center gap-3 pt-2">
            <a href="https://github.com/AyshaUrmi0/Tech-startup" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 text-gray-700 dark:text-gray-300 rounded-xl transition-all shadow-sm">
              <FaGithub className="text-lg" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 text-gray-700 dark:text-gray-300 rounded-xl transition-all shadow-sm">
              <FaTwitter className="text-lg" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 text-gray-700 dark:text-gray-300 rounded-xl transition-all shadow-sm">
              <FaLinkedin className="text-lg" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 text-gray-700 dark:text-gray-300 rounded-xl transition-all shadow-sm">
              <FaDiscord className="text-lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home Page</Link></li>
            <li><Link to="/campaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">All Campaigns</Link></li>
            <li><Link to="/addCampaign" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Launch a Campaign</Link></li>
            <li><Link to="/myCampaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">My Campaigns</Link></li>
            <li><Link to="/myDonations" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">My Contributions</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/campaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Artificial Intelligence</Link></li>
            <li><Link to="/campaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Renewable Energy</Link></li>
            <li><Link to="/campaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Hardware & Robotics</Link></li>
            <li><Link to="/campaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Health & Biotech</Link></li>
            <li><Link to="/campaigns" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Creative Ideas</Link></li>
          </ul>
        </div>

        {/* Platform & Security */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Security</h4>
          <div className="p-4 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-xs">
              <FaShieldAlt />
              <span>Verified Platform</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Secured with Firebase Auth & encrypted MongoDB persistence.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Operational Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-200/60 dark:bg-gray-950 py-6 px-6 text-xs text-gray-600 dark:text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Operational status: All Systems Normal</span>
          </div>
          <p>© {new Date().getFullYear()} TechSpring Platform Inc. Built for Innovators worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
