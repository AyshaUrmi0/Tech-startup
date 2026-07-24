import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Loading from "./Loading";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch campaigns with sorting
  const fetchCampaigns = async (sortByDesc) => {
    setLoading(true);
    const response = await fetch(`https://tech-spring-server.vercel.app/addCampaigns?sortByDesc=${sortByDesc}`);
    const data = await response.json();
    setCampaigns(data);
    setLoading(false);
  };

  // Fetch campaigns initially when the component mounts
  useEffect(() => {
    fetchCampaigns(false); // Default fetch with no sorting
  }, []);

  // Handle the sort button click
  const handleSort = () => {
    fetchCampaigns(true); // Fetch campaigns with descending sorting
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        <Typewriter
          words={["All Campaigns", "Sort the Campaigns according to minimum donation"]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      
      {/* Button to sort by descending order */}
      <button
        onClick={handleSort}
        className="px-5 py-2.5 mb-6 text-white font-medium bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-sm transition-colors"
      >
        Sort by Descending Order
      </button>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
        {loading ? (
          <Loading />
        ) : (
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-teal-600 dark:bg-teal-900 text-white">
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Title</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Minimum Donation</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Deadline</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800 text-gray-900 dark:text-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-teal-50/50 dark:hover:bg-gray-800/70 transition-colors">
                  <td className="px-6 py-4 font-medium">{campaign.title}</td>
                  <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-bold">${campaign.minimumDonation}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/campaign/${campaign._id}`)}
                      className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-md transition-colors"
                    >
                      See More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllCampaigns;
