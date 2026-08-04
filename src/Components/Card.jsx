import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_CAMPAIGN_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(
    item?.image || item?.imageURL || DEFAULT_CAMPAIGN_IMAGE
  );

  useEffect(() => {
    setImgSrc(item?.image || item?.imageURL || DEFAULT_CAMPAIGN_IMAGE);
  }, [item]);

  const handleSeeMore = () => {
    navigate(`/campaign/${item._id}`);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    setImgSrc(DEFAULT_CAMPAIGN_IMAGE);
  };

  return (
    <div className="w-11/12 mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <figure className="p-4 bg-gray-100 dark:bg-gray-700/50 min-h-[216px] flex items-center justify-center">
        <img
          src={imgSrc}
          alt={item?.title || "Campaign"}
          onError={handleImageError}
          className="w-full h-48 object-cover rounded-xl shadow-sm"
        />
      </figure>
      <div className="px-6 py-4 flex flex-col flex-grow items-center text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item?.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{item?.description}</p>
        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-4">Deadline: {item?.deadline}</p>
        <div className="mt-auto">
          <button onClick={handleSeeMore} className="px-5 py-2 font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-sm">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
