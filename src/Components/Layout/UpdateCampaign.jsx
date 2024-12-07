import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "./Loading";

const UpdateCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    userName: user?.displayName || "",
    userEmail: user?.email || "",
    image: "",
    minimumDonation: "",
    deadline: "",
  });

  useEffect(() => {
    fetch(`http://localhost:4000/campaigns/${id}`)
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
        });
      })
      .catch((error) => console.error("Error fetching campaign data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      userName: user.displayName, 
      userEmail: user.email,
      image: user.image,
    };

   
    fetch(`http://localhost:4000/campaigns/${id}`, {
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
          navigate("/campaigns");
        } else {
          toast.error("Failed to update the campaign!");
        }
      })
      .catch((error) => {
        console.error("Error updating campaign:", error);
        toast.error("Something went wrong!");
      });
  };

  if (!campaign) {
    return <Loading />; // Show a loading spinner or message
  }

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
            value={formData.image}
            onChange={handleChange}
            placeholder={formData.image || "Enter image URL"}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Campaign Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={formData.title || "Enter campaign title"}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Campaign Type</label>
          <select
            name="type"
            value={formData.type || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="Personal Issue">Personal Issue</option>
            <option value="Startup">Startup</option>
            <option value="Business">Business</option>
            <option value="Creative Ideas">Creative Ideas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder={formData.description || "Enter campaign description"}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Minimum Donation Amount
          </label>
          <input
            type="number"
            name="minimumDonation"
            value={formData.minimumDonation || ""}
            onChange={handleChange}
            placeholder={formData.minimumDonation || "Enter minimum donation amount"}
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

        <div>
          <label className="block mb-1 text-sm font-medium">User Name</label>
          <input
            type="text"
            value={user.displayName}
            className="w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">User Email</label>
          <input
            type="email"
            value={user.email}
            className="w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
