import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { url } from "../../address";
import { useAuth } from "../../Components/provider/AuthProvider"; // Import the hook
import { toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS

const CampaignDetails = ({ setDonations = () => {} }) => {
  // Pass setDonations as a prop with a default value
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Use the useAuth hook to get user data
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `https://tech-spring-server.vercel.app/campaign/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch campaign details");
        }
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch campaign details. Redirecting to homepage.");
        navigate("/");
      }
    };
    fetchCampaign();
  }, [id, navigate]);

  const handleDonate = async () => {
    if (!user) {
      toast.warn("Please log in to donate.");
      navigate("/login");
      return;
    }

    const currentDate = new Date();
    const campaignDeadline = new Date(campaign.deadline);

    if (currentDate > campaignDeadline) {
      toast.error("The campaign deadline is over. You cannot donate to this campaign.");
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      campaignTitle: campaign.title,
      userEmail: user.email,
      userName: user.displayName || user.email,
      amount: campaign.minimumDonation,
      // fallback to email if displayName is not available
    };

    try {
      const response = await fetch(`${url}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        toast.success("Thank you for your donation!");
        // After donation, refetch donations
        setDonations((prev) => [...prev, donationData]); // Update the donations list
      } else {
        toast.error("Failed to process donation. Please try again.");
      }
    } catch (error) {
      console.error("Error during donation:", error);
      toast.error("An error occurred while processing your donation.");
    }
  };

  // Display a loading spinner while waiting for user data
  if (loading) {
    return <Loading />;
  }

  if (!campaign) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 md:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{campaign.title}</h1>
      <img
        src={campaign.image || campaign.imageURL}
        alt={campaign.title}
        className="object-cover w-full h-80 my-4 rounded-xl shadow-md"
      />
      <div className="space-y-3 text-gray-700 dark:text-gray-200 mt-6 text-base">
        <p className="leading-relaxed">
          <strong className="text-gray-900 dark:text-white">Description:</strong> {campaign.description}
        </p>
        <p>
          <strong className="text-gray-900 dark:text-white">Minimum Donation:</strong> <span className="text-teal-600 dark:text-teal-400 font-bold">${campaign.minimumDonation}</span>
        </p>
        <p>
          <strong className="text-gray-900 dark:text-white">Deadline:</strong>{" "}
          {new Date(campaign.deadline).toLocaleDateString()}
        </p>
        {(campaign.organizer || campaign.userName) && (
          <p>
            <strong className="text-gray-900 dark:text-white">Organizer:</strong> {campaign.organizer?.name || campaign.userName} ({campaign.organizer?.email || campaign.userEmail})
          </p>
        )}
      </div>
      <button
        onClick={handleDonate}
        className="w-full sm:w-auto px-8 py-3 mt-6 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-md">
        Donate Now
      </button>
    </div>
  );
};

export default CampaignDetails;
