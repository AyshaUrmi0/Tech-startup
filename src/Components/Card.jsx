import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/campaign/${item._id}`); // Navigate to the details page using the campaign ID
  };

  return (
    <div className="shadow-xl card bg-base-100 w-96">
      <figure className="px-10 pt-10">
        <img
          src={item.imageURL}
          alt={item.title}
          className="rounded-xl"
        />
      </figure>
      <div className="items-center text-center card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <div className="card-actions">
          <button onClick={handleSeeMore} className="btn btn-primary">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
