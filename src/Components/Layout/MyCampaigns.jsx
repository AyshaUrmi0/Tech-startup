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
    // Navigate to the update page for the selected campaign
    navigate(`/updateCampaign/${campaignId}`);
  };

  const handleDelete = async (campaignId) => {
    // Confirm before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (confirmDelete) {
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

  // Show a loading spinner if user data is still being fetched
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">My Campaigns</h1>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Deadline</th>
              <th className="border border-gray-300 px-4 py-2">Minimum Donation</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td className="border border-gray-300 px-4 py-2">{campaign.title}</td>
                <td className="border border-gray-300 px-4 py-2">{campaign.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">${campaign.minimumDonation}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(campaign._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(campaign._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCampaigns;

