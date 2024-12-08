import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "./Loading"; // Add a loading component for better UX

const UpdateCampaign = () => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const navigate = useNavigate(); // Used for navigation
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const [campaign, setCampaign] = useState(null); // Store campaign data
  const [formData, setFormData] = useState({}); // Store form input data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch campaign data and check authentication
  useEffect(() => {
    if (!user) {
      setIsLoading(false); // Stop loading if the user is not logged in
      return;
    }

    // Fetch the campaign data by ID
    fetch(`https://tech-spring-server.vercel.app/campaigns/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCampaign(data);
        setFormData({
          image: data.image,
          title: data.title,
          type: data.type,
          description: data.description,
          minimumDonation: data.minimumDonation,
          deadline: data.deadline,
          userEmail: user.email,
          userName: user.displayName,
        });
        setIsLoading(false); // Data loaded
      })
      .catch((error) => {
        console.error("Error fetching campaign data:", error);
        setIsLoading(false); // Stop loading on error
      });
  }, [id, user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to update the campaign.");
      return;
    }

    const updatedData = {
      ...formData,
      userName: user.displayName, // Attach user's display name
      userEmail: user.email, // Attach user's email
    };

    fetch(`https://tech-spring-server.vercel.app/campaigns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Campaign updated successfully!");
          navigate("/campaigns"); // Redirect after success
        } else {
          toast.error("Failed to update the campaign!");
        }
      })
      .catch((error) => {
        console.error("Error updating campaign:", error);
        toast.error("Something went wrong!");
      });
  };

  // Show a loading spinner while loading
  if (isLoading) {
    return <Loading />;
  }

//   // Show login prompt if user is not authenticated
//   if (!user) {
//     return (
//       <div className="text-center mt-10">
//         <h2 className="text-xl font-semibold">You must be logged in to access this page.</h2>
//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={() => navigate("/login")}
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   // Show an error message if the campaign data is not found
//   if (!campaign) {
//     return <div className="text-center">Campaign not found.</div>;
//   }

  // Render the form for updating the campaign
  return (
    <div className="max-w-lg px-4 py-8 mx-auto md:px-6 lg:px-8">
      <h2 className="mb-4 text-2xl font-bold text-center md:text-left">
        Update Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Minimum Donation</label>
          <input
            type="number"
            name="minimumDonation"
            value={formData.minimumDonation || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Readonly email and displayName fields */}
        <div>
          <label className="block mb-1 text-sm font-medium">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">User Display Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
