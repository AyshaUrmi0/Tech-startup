import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row">
      <div className="container px-4 py-8 mx-auto md:w-1/2">
        <h3 className="mb-4 text-xl font-bold text-teal-400">TulipCrowd</h3>
        <p className="text-gray-400">
          TulipCrowd is your trusted platform for funding tech startups,
          creative ideas, and personal causes. Join us to make a difference.
        </p>
      </div>

      <div className="container px-4 py-8 mx-auto md:w-1/2">
        <h3 className="mb-4 text-xl font-bold text-teal-400">Contact Us</h3>
        <p className="text-gray-400">123 Startup Lane, Tech City</p>
        <p className="text-gray-400">Email: support@techspring.com</p>
        <p className="text-gray-400">Phone: +880******</p>

        <div className="flex mt-4 space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-teal-300">
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-teal-300">
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-teal-300">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto md:w-1/2 md:hidden">
        <h3 className="mb-4 text-xl font-bold text-teal-400">Quick Links</h3>
        <ul>
          <li>
            <Link to="/" className="text-gray-400 hover:text-teal-300">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/my-donations"
              className="text-gray-400 hover:text-teal-300">
              My Donations
            </Link>
          </li>
          <li>
            <Link
              to="/my-campaigns"
              className="text-gray-400 hover:text-teal-300">
              My Campaigns
            </Link>
          </li>
        </ul>
      </div>

      <div className="container px-4 py-8 mx-auto md:w-1/2 md:hidden">
        <h3 className="mb-4 text-xl font-bold text-teal-400">Subscribe</h3>
        <p className="text-gray-400">
          Stay updated with our latest news and campaigns.
        </p>
        <form>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full py-2 pl-10 text-gray-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-teal-400 rounded-lg hover:bg-teal-500">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
