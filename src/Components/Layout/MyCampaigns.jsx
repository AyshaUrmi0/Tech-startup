import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/provider/AuthProvider"; // Import the hook
import Loading from "./Loading";
import { toast } from "react-toastify";

const MyCampaigns = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); 
 
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns from the backend that belong to the current user
    const fetchUserCampaigns = async () => {
      if (!user) {
        navigate("/login"); // If user is not logged in, redirect to login page
        return;
      }

      try {
        const response = await fetch(`https://tech-spring-server.vercel.app/campaigns/${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns.");
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching user campaigns:", error);
        toast.error("Unable to fetch your campaigns.");
      }
    };

    fetchUserCampaigns();
  }, [user, navigate]);

  const handleUpdate = (campaignId) => {

    navigate(`/updateCampaign/${campaignId}`);
  };

  const handleDelete = async (campaignId) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        const response = await fetch(`https://tech-spring-server.vercel.app/campaign/${campaignId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setCampaigns(campaigns.filter((campaign) => campaign._id !== campaignId));
          toast.success("Campaign deleted successfully.");
        } else {
          toast.error("Failed to delete the campaign.");
        }
      } catch (error) {
        console.error("Error deleting campaign:", error);
        toast.error("An error occurred while deleting the campaign.");
      }
    }
  };

  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Campaigns</h1>
      {campaigns.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No campaigns found. Start by creating a new campaign!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-teal-600 dark:bg-teal-900 text-white">
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Title</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Description</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Deadline</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Min Donation</th>
                <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800 text-gray-900 dark:text-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-teal-50/50 dark:hover:bg-gray-800/70 transition-colors">
                  <td className="px-6 py-4 font-semibold">{campaign.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">{campaign.description}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-bold">${campaign.minimumDonation}</td>
                  <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdate(campaign._id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;

