import React from "react";

const CardM = ({ data }) => {
  return (
    <div>
      <div className="card shadow-xl">
        <figure className="px-10 pt-10">
          <img src={data.image} alt={data.title} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{data.campaignTitle}</h2>
          <p>{data.description}</p>
          <p>Amount: {data.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default CardM;
