import React, {  useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";


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

        fetch('http://localhost:4000/addCampaigns',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        )
        
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.insertedId) {
              toast.success('Campaign added successfully!');
             
            } else {
              toast.error('Failed to add the campaign!');
            }
          })
        

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
    <div className="max-w-lg px-4 py-8 mx-auto md:px-6 lg:px-8">
    <h2 className="mb-4 text-2xl font-bold text-center md:text-left">Add New Campaign</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 text-sm font-medium">Image URL</label>
        <input
          type="text"
          name="image"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter the image URL"
          required
        />
      </div>
  
      <div>
        <label className="block mb-1 text-sm font-medium">Campaign Title</label>
        <input
          type="text"
          name="title"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter the campaign title"
          required
        />
      </div>
  
      <div>
        <label className="block mb-1 text-sm font-medium">Campaign Type</label>
        <select
          name="type"
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
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter the campaign description"
          required
        ></textarea>
      </div>
  
      <div>
        <label className="block mb-1 text-sm font-medium">Minimum Donation Amount</label>
        <input
          type="number"
          name="minimumDonation"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter the minimum donation amount"
          required
        />
      </div>
  
      <div>
        <label className="block mb-1 text-sm font-medium">Deadline</label>
        <input
          type="date"
          name="deadline"
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
        Add Campaign
      </button>
    </form>
  </div>
  
  );
};

export default AddCampaign;
