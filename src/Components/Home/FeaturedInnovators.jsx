import React from "react";
import "animate.css"; // Include Animate.css

const FeaturedInnovators = () => {
  const innovators = [
    {
      id: 1,
      name: "Alice Johnson",
      title: "AI Enthusiast",
      project: "SmartVision",
      description: "Empowering visually impaired individuals through AI-powered glasses.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "John Doe",
      title: "Sustainable Engineer",
      project: "EcoPower",
      description: "Revolutionizing renewable energy solutions for small communities.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Sophia Lee",
      title: "Health Innovator",
      project: "MediBuddy",
      description: "Making healthcare accessible through wearable technology.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold animate__animated animate__fadeInDown">
            Featured Innovators
          </h2>
          <p className="mt-4 text-gray-600 animate__animated animate__fadeInUp">
            Meet the brilliant minds driving innovation! Learn about the creators and their journey
            as they turn groundbreaking ideas into reality.
          </p>
        </div>

        <div className="relative border-l border-gray-300">
          {innovators.map((innovator, index) => (
            <div
              key={innovator.id}
              className={`mb-10 ml-8 animate__animated ${
                index % 2 === 0 ? "animate__slideInLeft" : "animate__slideInRight"
              }`}
            >
              <div className="absolute w-8 h-8 border-4 border-white rounded-full bg-primary -left-4"></div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={innovator.image}
                    alt={innovator.name}
                    className="object-cover w-16 h-16 mr-4 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{innovator.name}</h3>
                    <p className="text-gray-500">{innovator.title}</p>
                  </div>
                </div>
                <p className="text-gray-700">{innovator.description}</p>
                <a href="#" className="inline-block mt-4 font-semibold text-primary">
                  View {innovator.project} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/start-campaign" className="btn btn-accent">
            Start Your Campaign
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInnovators;
