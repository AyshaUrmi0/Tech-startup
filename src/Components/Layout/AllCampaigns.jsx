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
      <h1 className="text-2xl font-bold mb-5">All Campaigns</h1>
      
      {/* Button to sort by descending order */}
      <button
        onClick={handleSort}
        className="bg-teal-500 text-white px-4 py-2 rounded mb-5"
      >
        Sort by Descending Order
      </button>

      <div className="overflow-x-auto">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Minimum Donation</th>
                <th className="border border-gray-300 px-4 py-2">Deadline</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{campaign.title}</td>
                  <td className="border border-gray-300 px-4 py-2">${campaign.minimumDonation}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => navigate(`/campaign/${campaign._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
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
