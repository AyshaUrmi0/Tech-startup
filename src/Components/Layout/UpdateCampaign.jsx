import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "./Loading";

const UpdateCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch campaign data on mount
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `https://tech-spring-server.vercel.app/campaigns/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch campaign data");
        const data = await response.json();
        setFormData({
          image: data.image || "",
          title: data.title || "",
          type: data.type || "Startup",
          description: data.description || "",
          minimumDonation: data.minimumDonation || "",
          deadline: data.deadline ? data.deadline.split("T")[0] : "",
          userEmail: user.email,
          userName: user.displayName,
        });
      } catch (error) {
        console.error("Error fetching campaign data:", error);
        toast.error("Could not load campaign. Please try again.");
        navigate("/myCampaigns");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id, user, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to update a campaign.");
      return;
    }

    const updatedData = {
      ...formData,
      userName: user.displayName,
      userEmail: user.email,
    };

    try {
      const response = await fetch(
        `https://tech-spring-server.vercel.app/campaigns/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      if (data.modifiedCount > 0) {
        toast.success("Campaign updated successfully!");
        navigate("/myCampaigns");
      } else {
        toast.error("No changes were made to the campaign.");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-2xl px-6 py-8 mx-auto my-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition-colors duration-300">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
        Update Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter image URL"
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
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter campaign title"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Campaign Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
          >
            <option value="Personal Issue">Personal Issue</option>
            <option value="Startup">Startup</option>
            <option value="Business">Business</option>
            <option value="Creative Ideas">Creative Ideas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            rows="4"
            placeholder="Enter campaign description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Minimum Donation Amount ($)
          </label>
          <input
            type="number"
            name="minimumDonation"
            value={formData.minimumDonation}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            placeholder="Enter minimum donation amount"
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
              User Name
            </label>
            <input
              type="text"
              value={formData.userName || ""}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
              User Email
            </label>
            <input
              type="email"
              value={formData.userEmail || ""}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-md mt-4"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
