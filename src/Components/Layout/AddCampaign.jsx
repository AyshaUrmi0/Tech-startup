import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const type = form.type.value;
    const description = form.description.value;
    const minimumDonation = form.minimumDonation.value;
    const deadline = form.deadline.value;

    // Create form data
    const formData = {
      image,
      title,
      type,
      description,
      minimumDonation,
      deadline,
    };

    // Merge user details into form data
    const newCampaign = {
      ...formData,
      userName: user.displayName,
      userEmail: user.email,
    };

    // Send the request
    fetch("https://tech-spring-server.vercel.app/addCampaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCampaign), // Send merged object
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Campaign added successfully!");
          navigate("/myCampaigns"); // Navigate to MyCampaigns on success
        } else {
          toast.error("Failed to add the campaign!");
        }
      })
      .catch((error) => {
        console.error("Error adding campaign:", error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="max-w-2xl px-6 py-8 mx-auto my-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition-colors duration-300">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
        Add New Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Image URL</label>
          <input
            type="text"
            name="image"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Campaign Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter the campaign title"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Campaign Type
          </label>
          <select
            name="type"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors">
            <option value="Personal Issue">Personal Issue</option>
            <option value="Startup">Startup</option>
            <option value="Business">Business</option>
            <option value="Creative Ideas">Creative Ideas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter the campaign description"
            required></textarea>
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Minimum Donation Amount ($)
          </label>
          <input
            type="number"
            name="minimumDonation"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter the minimum donation amount"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-md mt-4">
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
