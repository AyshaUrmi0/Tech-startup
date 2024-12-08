import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {url} from '../../address'
const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Ensure user is available before making the request
    if (user?.email) {
      fetch(`${url}/mydonations/emailSpecific/${user.email}`,{
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
      })
      })

  
        .then((response) => response.json())
        .then((data) => {
          setDonations(data);
          console.log(data); // Optionally log the data for debugging
        })
        .catch((error) => console.error("Error fetching donations:", error));
    }
  }, [user?.email]); // Dependency on user email to re-fetch when the user changes

  return (
    <div className="myDonationsContainer">
      <h2 className="mb-6 text-2xl font-bold text-center">My Donations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <div key={donation.id} className="max-w-sm overflow-hidden rounded shadow-lg">
              <img className="w-full" src={donation.image} alt={donation.title} />
              <div className="px-6 py-4">
                <h3 className="mb-2 text-xl font-bold">{donation.campaignTitle}</h3>
                <p className="text-base text-gray-700">{donation.description}</p>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-600">Amount Donated: ${donation.amount}</span>
                <span className="text-sm text-gray-600">
                  Date: {new Date(donation.donationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No donations found.</div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
