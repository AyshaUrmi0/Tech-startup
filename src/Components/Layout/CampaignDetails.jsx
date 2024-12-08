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
    <div className="p-5">
      <h1 className="text-2xl font-bold">{campaign.title}</h1>
      <img
        src={campaign.imageURL}
        alt={campaign.title}
        className="object-cover w-full h-64 my-4"
      />
      <p>
        <strong>Description:</strong> {campaign.description}
      </p>
      <p>
        <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(campaign.deadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Organizer:</strong> {campaign.organizer?.name} (
        {campaign.organizer?.email})
      </p>
      <button
        onClick={handleDonate}
        className="px-4 py-2 mt-4 text-white bg-teal-400 rounded">
        Donate
      </button>
    </div>
  );
};

export default CampaignDetails;
