import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../../Components/provider/AuthProvider"; // Import the hook

const CampaignDetails = ({ setDonations = () => {} }) => {  // Pass setDonations as a prop with a default value
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Use the useAuth hook to get user data
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:4000/campaign/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch campaign details");
        }
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error(error);
        alert("Unable to fetch campaign details. Redirecting to homepage.");
        navigate("/");
      }
    };
    fetchCampaign();
  }, [id, navigate]);

  const handleDonate = async () => {
    if (!user) {
      alert("Please log in to donate.");
      navigate("/login");
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      campaignTitle: campaign.title,
      userEmail: user.email,
      userName: user.displayName || user.email, // fallback to email if displayName is not available
    };

    try {
      const response = await fetch("http://localhost:4000/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        alert("Thank you for your donation!");
        // After donation, refetch donations
        setDonations(prev => [...prev, donationData]);  // Update the donations list
      } else {
        alert("Failed to process donation. Please try again.");
      }
    } catch (error) {
      console.error("Error during donation:", error);
      alert("An error occurred while processing your donation.");
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
        className="w-full h-64 object-cover my-4"
      />
      <p>
        <strong>Description:</strong> {campaign.description}
      </p>
      <p>
        <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
      </p>
      <p>
        <strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Organizer:</strong> {campaign.organizer?.name} ({campaign.organizer?.email})
      </p>
      <button
        onClick={handleDonate}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Donate
      </button>
    </div>
  );
};

export default CampaignDetails;

