import React, {  useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const AddCampaign = () => {
  const { user } = useContext(AuthContext); 
 



  const handleSubmit = async (e) => {
    e.preventDefault();

    const form =e.target;
    const image=form.image.value;
    const title=form.title.value;
    const type=form.type.value;
    const description=form.description.value;
    const minimumDonation=form.minimumDonation.value;
    const deadline=form.deadline.value;


    const formData={
        image, title,type,description,minimumDonation,deadline
    }
    console.log(formData);


    // Adding user details to the form data
    const newCampaign = {
     
      userName: user.displayName,
      userEmail: user.email,
    };

//     try {
//       const response = await fetch("https://your-server-url.com/campaigns", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCampaign),
//       });

//       if (response.ok) {
//         toast.success("Campaign added successfully!");
//         setFormData({
//           image: "",
//           title: "",
//           type: "Personal Issue",
//           description: "",
//           minimumDonation: "",
//           deadline: "",
//         });
//       } else {
//         toast.error("Failed to add the campaign!");
//       }
//     } catch (error) {
//       console.error("Error adding campaign:", error);
//       toast.error("Something went wrong!");
//     }
  };

  return (
    <div className="w-4/12 px-4 py-8 mx-auto ">
      <h2 className="mb-4 text-2xl font-bold">Add New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            // value={formData.image}
            // onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Title</label>
          <input
            type="text"
            name="title"
            // value={formData.title}
            // onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter the campaign title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Type</label>
          <select
            name="type"
            // value={formData.type}
            // onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Personal Issue">Personal Issue</option>
            <option value="Startup">Startup</option>
            <option value="Business">Business</option>
            <option value="Creative Ideas">Creative Ideas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            // value={formData.description}
            // onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter the campaign description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Minimum Donation Amount</label>
          <input
            type="number"
            name="minimumDonation"
            // value={formData.minimumDonation}
            // onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter the minimum donation amount"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            // value={formData.deadline}
            // onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">User Name</label>
          <input
            type="text"
            value={user.displayName}
            className="w-full px-4 py-2 bg-gray-100 border rounded"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium">User Email</label>
          <input
            type="email"
            value={user.email}
            className="w-full px-4 py-2 bg-gray-100 border rounded"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
