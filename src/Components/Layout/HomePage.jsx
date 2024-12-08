import React from "react";
import BannerSlider from "../Home/BannerSlider";
import Test from "../test";
import FeaturedInnovators from "../Home/FeaturedInnovators";
import InnovatorSpotlight from "../Home/InnovatorSpotlight ";

const HomePage = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto my-3">
        <BannerSlider />
      </div>
      <Test />
      <FeaturedInnovators />
      <InnovatorSpotlight />
    </div>
  );
};

export default HomePage;
