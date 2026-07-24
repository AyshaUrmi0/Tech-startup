import React from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

const CardM = ({ data }) => {
  const title = data.campaignTitle || data.title || "Crowdfunding Campaign";
  const image = data.image || data.imageURL || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80";
  const amount = data.amount || data.minimumDonation || data.donatedAmount || "100";
  const dateFormatted = data.donationDate ? new Date(data.donationDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : "Recent";

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Campaign Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute top-3 right-3 bg-teal-600/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
            <FaHandHoldingHeart className="text-white text-xs" />
            <span>${amount}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <FaCalendarAlt className="text-teal-500" />
            <span>Donated on {dateFormatted}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {title}
          </h3>
          {data.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700/50 mt-2">
        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/40 px-2.5 py-1 rounded-md">
          Contribution Verified
        </span>
        {data.campaignId && (
          <Link
            to={`/campaign/${data.campaignId}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <span>Details</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardM;
