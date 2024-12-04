import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/gZH5PsX/techspring-slide1.jpg",
      title: "Welcome to TechSpring",
      description: "Empowering the next generation of tech startups to innovate and grow.",
    },
    {
      id: 2,
      image: "https://i.ibb.co/VtKjsZhttps://i.ibb.co.com/MBFyhY8/futurism-perspective-digital-nomads-lifestyle-1.jpgX/techspring-slide2.jpg",
      title: "Shape Your Future",
      description: "Join us in launching revolutionary tech solutions that change the world.",
    },
    {
      id: 3,
      image: "https://i.ibb.co/37mNSjb/techspring-slide3.jpg",
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
