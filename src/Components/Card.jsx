import React from "react";

const Card = ({ item }) => {
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
            <button className="btn btn-primary">
              <a href={item.seeMoreLink}>See More</a>
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default Card;


