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
    <div className="myDonationsContainer flex flex-col items-center justify-center">
      <h2 className="mb-6 text-2xl font-bold text-center">My Donations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <CardM key={donation.id} data={donation} />
          ))
        ) : (
          <div>No donations found.</div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
