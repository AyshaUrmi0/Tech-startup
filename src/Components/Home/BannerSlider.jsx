import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
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
    <div className="w-full rounded-2xl h-[400px] md:h-[500px] overflow-hidden relative shadow-xl">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
        spaceBetween={0}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
              <h2 className="text-3xl font-extrabold md:text-5xl tracking-tight drop-shadow-md">
                {slide.title}
              </h2>
              <p className="mt-4 text-lg md:text-xl max-w-2xl font-medium drop-shadow-sm text-gray-100">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
