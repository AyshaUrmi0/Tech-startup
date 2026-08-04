import React from "react";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";
import { FaRocket, FaAward, FaUsers } from "react-icons/fa";

const FeaturedInnovators = () => {
  const innovators = [
    {
      id: 1,
      name: "Dr. Elena Rostova",
      role: "AI & Computer Vision Lead",
      project: "SmartVision AI",
      raised: "$850,000",
      backers: "3,420",
      category: "Artificial Intelligence",
      description: "Pioneering real-time spatial vision algorithms powering next-generation smart assistive eyewear for the visually impaired.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Robotics & Quantum Architect",
      project: "QuantumCore Processor",
      raised: "$1,450,000",
      backers: "5,890",
      category: "Quantum Hardware",
      description: "Engineered ultra-efficient low-power quantum processing units for mobile robotic autonomous decision-making.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      role: "Sustainable Energy Specialist",
      project: "EcoPower Micro-Grid",
      raised: "$2,100,000",
      backers: "8,120",
      category: "Renewable Tech",
      description: "Transforming urban clean energy distribution through decentralized micro-solar grid storage systems.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <Fade direction="down" triggerOnce>
        <div className="mb-12 text-center">
          <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 rounded-full border border-teal-200 dark:border-teal-800">
            Pioneers of Innovation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4">
            Featured Innovators
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base">
            Meet the brilliant minds shaping the future of technology, sustainability, and human potential through TechSpring.
          </p>
        </div>
      </Fade>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {innovators.map((innovator) => (
          <Zoom key={innovator.id} triggerOnce>
            <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
              
              {/* Image & Header Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={innovator.image}
                  alt={innovator.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-teal-500/90 text-white backdrop-blur-sm rounded-md shadow-sm">
                    {innovator.category}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 text-white drop-shadow-sm">{innovator.name}</h3>
                  <p className="text-xs text-teal-300 font-medium">{innovator.role}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {innovator.description}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-100 dark:border-gray-700/60 mb-6 bg-gray-50/50 dark:bg-gray-900/40 rounded-xl px-4">
                  <div className="flex items-center space-x-2">
                    <FaRocket className="text-teal-600 dark:text-teal-400 text-sm" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Raised</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{innovator.raised}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-teal-600 dark:text-teal-400 text-sm" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Backers</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{innovator.backers}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    Project: <span className="text-gray-900 dark:text-white font-semibold">{innovator.project}</span>
                  </span>
                  <Link
                    to="/campaigns"
                    className="px-4 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/40 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 border border-teal-200 dark:border-teal-800 rounded-lg transition-colors shadow-sm"
                  >
                    Explore Campaigns &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </Zoom>
        ))}
      </div>
    </section>
  );
};

export default FeaturedInnovators;
