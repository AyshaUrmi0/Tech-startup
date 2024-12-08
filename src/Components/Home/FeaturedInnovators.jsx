import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const FeaturedInnovators = () => {
  const innovators = [
    {
      id: 1,
      name: "Alice Johnson",
      title: "AI Enthusiast",
      project: "SmartVision",
      description: "Empowering visually impaired individuals through AI-powered glasses.",
      image: "https://i.ibb.co/Y75gzrr/vecteezy-old-man-teacher-face-3d-profession-avatars-28238588.png",
    },
    {
      id: 2,
      name: "John Doe",
      title: "Sustainable Engineer",
      project: "EcoPower",
      description: "Revolutionizing renewable energy solutions for small communities.",
      image: "https://i.ibb.co/n0rbvSH/vecteezy-man-avatar-clipart-illustration-9397835.png",
    },
    {
      id: 3,
      name: "Sophia Lee",
      title: "Health Innovator",
      project: "MediBuddy",
      description: "Making healthcare accessible through wearable technology.",
      image: "https://i.ibb.co/sJTxd4c/vecteezy-woman-face-expression-clipart-design-illustration-9379900.png",
    },
  ];

  return (
    <section className="container items-center justify-center py-16 mx-auto">
      <div className="container px-4 mx-auto">
        <Fade direction="down" triggerOnce>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">Featured Innovators</h2>
            <p className="mt-4">
              Meet the brilliant minds driving innovation! Learn about the creators and their journey
              as they turn groundbreaking ideas into reality.
            </p>
          </div>
        </Fade>

        <div className="relative border-l border-gray-300">
          {innovators.map((innovator, index) => (
            <Slide
              direction={index % 2 === 0 ? "left" : "right"}
              triggerOnce
              key={innovator.id}
            >
              <div className="mb-10 ml-8">
                <div className="absolute w-8 h-8 bg-teal-400 border-4 border-white rounded-full -left-4"></div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={innovator.image}
                      alt={innovator.name}
                      className="object-cover w-16 h-16 mr-4 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-black">{innovator.name}</h3>
                      <p className="text-black-500">{innovator.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{innovator.description}</p>
                  <a href="#" className="inline-block mt-4 font-semibold text-teal-400">
                    View {innovator.project} &rarr;
                  </a>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInnovators;
