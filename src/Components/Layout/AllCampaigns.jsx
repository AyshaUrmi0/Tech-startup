import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch campaigns with sorting
  const fetchCampaigns = async (sortByDesc) => {
    setLoading(true);
    const response = await fetch(`http://localhost:4000/addCampaigns?sortByDesc=${sortByDesc}`);
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
    <div className="p-5">
      <h1 className="mb-5 text-2xl font-bold">All Campaigns</h1>
      
      {/* Button to sort by descending order */}
      <button
        onClick={handleSort}
        className="px-4 py-2 mb-5 text-white bg-teal-500 rounded"
      >
        Sort by Descending Order
      </button>

      <div className="overflow-x-auto">
        {loading ? (
          <Loading />
        ) : (
          <table className="w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr className="bg-teal-400">
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">Minimum Donation</th>
                <th className="px-4 py-2 border border-gray-300">Deadline</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{campaign.title}</td>
                  <td className="px-4 py-2 border border-gray-300">${campaign.minimumDonation}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => navigate(`/campaign/${campaign._id}`)}
                      className="px-4 py-2 text-white bg-teal-400 rounded"
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
