import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-11/12 mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-4 animate-pulse flex flex-col justify-between">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
      <div className="flex flex-col items-center space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-28 mt-2"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
