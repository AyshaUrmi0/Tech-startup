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
    console.log("User:", user);
    console.log("Campaign ID:", id);
    console.log("Campaign:", campaign);

    // Fetch the campaign data by ID
    fetch(`https://tech-spring-server.vercel.app/campaigns/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCampaign(data);
        console.log("Campaign data:", data);
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
    <div className="max-w-2xl px-6 py-8 mx-auto my-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition-colors duration-300">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
        Update Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            rows="4"
            required></textarea>
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Minimum Donation ($)
          </label>
          <input
            type="number"
            name="minimumDonation"
            value={formData.minimumDonation || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">User Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail || ""}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
              User Display Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName || ""}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-md mt-4">
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
