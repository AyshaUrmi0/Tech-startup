import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
      title: "Welcome to TechSpring",
      description:
        "Empowering the next generation of tech startups to innovate and grow.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
      title: "Shape Your Future",
      description:
        "Join us in launching revolutionary tech solutions that change the world.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      title: "Join The Movement",
      description:
        "Be part of a community that supports innovative tech startups and ideas.",
    },
  ];

  return (
    <div className="w-full rounded-2xl h-[400px] md:h-[500px] overflow-hidden relative shadow-xl">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
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
