import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
// import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view your donations.");
      // navigate("/login");
      return;
    }

    const fetchDonations = async () => {
      try {
        const response = await fetch(`https://tech-spring-server.vercel.app/donations?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }
        const data = await response.json();
        setDonations(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load donations.");
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!donations.length) {
    return <div>No donations found. Start contributing today!</div>;
  }

  return (
    <div className="myDonationsContainer">
      <h2 className="mb-6 text-2xl font-bold text-center">My Donations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation) => (
          <div key={donation.id} className="max-w-sm overflow-hidden rounded shadow-lg">
            <img className="w-full" src={donation.image} alt={donation.title} />
            <div className="px-6 py-4">
              <h3 className="mb-2 text-xl font-bold">{donation.title}</h3>
              <p className="text-base text-gray-700">{donation.description}</p>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-gray-600">Amount Donated: ${donation.amount}</span>
              <span className="text-sm text-gray-600">
                Date: {new Date(donation.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;

