import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/campaign/${item._id}`); 
  };

  return (
    <div className="w-11/12 mx-auto bg-teal-100 shadow-xl card">
      <figure className="px-10 pt-10">
        <img
          src={item.imageURL}
          alt={item.title}
          className="rounded-xl"
        />
      </figure>
      <div className="items-center card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <p>Deadline: {item.deadline}</p>
        <div className="card-actions">
          <button onClick={handleSeeMore} className="bg-teal-400 btn">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
