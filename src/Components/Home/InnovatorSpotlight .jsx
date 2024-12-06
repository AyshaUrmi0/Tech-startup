import React from "react";

const InnovatorSpotlight = () => {
   const innovators = [
       {
           name: "Alex Johnson",
           tagline: "Redefining AI for Healthcare",
           photo: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1733415489~exp=1733419089~hmac=f98324ca4a0719917f68f09a51d0c036de5533629c81dee72e90802ca00fb94f&w=740",
           story: "Alex's AI project is transforming diagnostics by providing instant and accurate results. Crowdfunding enabled him to develop a prototype that is now saving lives.",
           campaignLink: "/campaign/1",
       },
       {
           name: "Sophia Lee",
           tagline: "Sustainable Tech for a Better Planet",
           photo: "https://img.freepik.com/free-vector/young-man-orange-hoodie_1308-173533.jpg?t=st=1733415564~exp=1733419164~hmac=e84d6ded91aaa453cbc87d9cf747d7dd723a74ca62b81216b4913e7dfc880eca&w=360",
           story: "Sophia's eco-friendly hardware initiative is reducing e-waste. With support from backers, she has scaled her production and made an impact globally.",
           campaignLink: "/campaign/2",
       },
   ];

   return (
       <section className="py-10 bg-gray-100">
           <h2 className="mb-8 text-3xl font-bold text-center">Innovator Spotlight</h2>
           <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2">
               {innovators.map((innovator, index) => (
                   <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                       <img
                           src={innovator.photo}
                           alt={innovator.name}
                           className="w-32 h-32 mx-auto rounded-full"
                       />
                       <h3 className="mt-4 text-xl font-semibold text-center">{innovator.name}</h3>
                       <p className="text-center text-gray-600">{innovator.tagline}</p>
                       <p className="mt-4 text-gray-700">{innovator.story}</p>
                       <a
                           href={innovator.campaignLink}
                           className="block px-4 py-2 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                       >
                           View Campaign
                       </a>
                   </div>
               ))}
           </div>
       </section>
   );
};

export default InnovatorSpotlight;
