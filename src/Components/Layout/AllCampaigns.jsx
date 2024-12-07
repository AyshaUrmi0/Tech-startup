import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/addCampaigns");
      const data = await response.json();
      setCampaigns(data);
      setLoading(false);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">All Campaigns</h1>
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

