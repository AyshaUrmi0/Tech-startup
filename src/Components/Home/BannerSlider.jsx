import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/scene-with-business-person-working-futuristic-office-job_23-2151003746.jpg?t=st=1733416578~exp=1733420178~hmac=734e3b835d74b25f101550e124d8a24f2961644d6c329950fac747c52d44bd78&w=900",
      title: "Welcome to TechSpring",
      description: "Empowering the next generation of tech startups to innovate and grow.",
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/scene-with-business-person-working-futuristic-office-job_23-2151003743.jpg",
      title: "Shape Your Future",
      description: "Join us in launching revolutionary tech solutions that change the world.",
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-photo/business-person-futuristic-business-environment_23-2150970215.jpg?t=st=1733416632~exp=1733420232~hmac=2d5cfbf2fc44fcf387cf585891a2fd913647efd8abb57ca0cdf31a7e55063bc2&w=826",
      title: "Join The Movement",
      description: "Be part of a community that supports innovative tech startups and ideas.",
    },
  ];
  
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Swiper
        modules={[Navigation]} // Use the imported Navigation module
        navigation
        loop
        className="h-full"
        spaceBetween={30}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Slide Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
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
