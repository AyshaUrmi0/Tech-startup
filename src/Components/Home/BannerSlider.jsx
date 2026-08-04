import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Welcome to TechSpring",
      description:
        "Empowering the next generation of tech startups to innovate and grow.",
    },
    {
      id: 2,
      image: banner2,
      title: "Shape Your Future",
      description:
        "Join us in launching revolutionary tech solutions that change the world.",
    },
    {
      id: 3,
      image: banner3,
      title: "Join The Movement",
      description:
        "Be part of a community that supports innovative tech startups and ideas.",
    },
  ];

  return (
    <div className="w-full rounded-md h-[400px] md:h-[500px] overflow-hidden">
      <Swiper
        modules={[Navigation]} // Use the imported Navigation module
        navigation
        loop
        className="h-full w-full"
        spaceBetween={30}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Slide Text */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white">
              <h2 className="text-3xl font-bold md:text-5xl">{slide.title}</h2>
              <p className="mt-4 text-lg md:text-xl">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
