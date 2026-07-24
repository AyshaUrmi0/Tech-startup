import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { url } from "../../address";
import CardM from "../Others/CardM";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Ensure user is available before making the request
    if (user?.email) {
      fetch(`${url}/mydonations/emailSpecific/${user.email}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
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
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">My Donations</h2>
      {donations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <CardM key={donation.id || donation._id} data={donation} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No donations found yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
