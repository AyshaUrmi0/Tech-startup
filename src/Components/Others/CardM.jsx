import React from "react";

const CardM = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col justify-between">
      {data.image && (
        <figure className="mb-4">
          <img src={data.image} alt={data.campaignTitle || data.title} className="w-full h-44 object-cover rounded-xl shadow-sm" />
        </figure>
      )}
      <div className="items-center text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{data.campaignTitle || data.title}</h2>
        {data.description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{data.description}</p>}
        {data.amount && <p className="text-lg font-bold text-teal-600 dark:text-teal-400">Donated: ${data.amount}</p>}
      </div>
    </div>
  );
};

export default CardM;
