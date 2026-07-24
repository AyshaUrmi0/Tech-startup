import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { url } from "../../address";
import CardM from "../Others/CardM";
import CardSkeleton from "../Others/CardSkeleton";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaDonate, FaAward, FaHeart } from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`${url}/mydonations/emailSpecific/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setDonations(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  // Calculate total donated amount
  const totalAmount = donations.reduce((sum, item) => {
    const val = parseFloat(item.amount || item.minimumDonation || item.donatedAmount || 0);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      {/* Header Banner */}
      <Fade direction="down" triggerOnce>
        <div className="mb-10 text-center">
          <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 rounded-full border border-teal-200 dark:border-teal-800">
            Your Contribution Impact
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
            My Donations History
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm">
            Thank you for supporting visionary creators and tech startups making a real difference.
          </p>
        </div>
      </Fade>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 rounded-xl text-2xl">
            <FaHandHoldingHeart />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-gray-400">Total Donated</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-xl text-2xl">
            <FaDonate />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-gray-400">Campaigns Backed</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{donations.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 rounded-xl text-2xl">
            <FaAward />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-gray-400">Supporter Status</p>
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
              {donations.length > 3 ? "Platinum Patron" : donations.length > 0 ? "Impact Backer" : "Explorer"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid / Loading / Empty */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : donations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <Zoom key={donation._id || donation.id} triggerOnce>
              <CardM data={donation} />
            </Zoom>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto">
          <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <FaHeart />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Donations Found Yet</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            You haven't backed any campaigns yet. Explore running campaigns and support groundbreaking tech ideas today!
          </p>
          <Link
            to="/campaigns"
            className="inline-block px-6 py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl transition-colors shadow-md text-sm"
          >
            Explore All Campaigns
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
