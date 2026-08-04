import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { FaQuoteLeft, FaCheckCircle, FaArrowRight, FaStar } from "react-icons/fa";

const InnovatorSpotlight = () => {
  const spotlights = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      tagline: "Breakthrough in AI Diagnostic Vision",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      story: "Through TechSpring backers, Sarah raised $850k to prototype non-invasive AI smart glasses for early diabetic retinopathy detection. Her solution is currently in clinical trial phases across 14 hospitals.",
      achievement: "Featured in MIT Tech Review 2026",
      impact: "14+ Clinical Trials Active",
      badge: "Spotlight Founder",
    },
    {
      id: 2,
      name: "David Vance",
      tagline: "Eco-Friendly Micro-Grid Power Technology",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      story: "David developed a decentralized solar micro-grid battery system that provides uninterrupted renewable power to off-grid rural communities. Over 5,000 households have gained access to clean energy.",
      achievement: "Global Green Tech Winner",
      impact: "5,000+ Homes Powered",
      badge: "Community Pioneer",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <Fade direction="down" triggerOnce>
        <div className="mb-12 text-center">
          <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 rounded-full border border-teal-200 dark:border-teal-800">
            Founder Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4">
            Innovator Spotlight
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base">
            Discover how crowdfunding on TechSpring empowers visionary creators to transform early prototypes into real-world impact.
          </p>
        </div>
      </Fade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {spotlights.map((item) => (
          <Zoom key={item.id} triggerOnce>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between relative overflow-hidden group">
              
              {/* Subtle Ambient Background Accent */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              <div>
                {/* Header Profile Info */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <img
                      src={item.photo}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
                      }}
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-teal-500/30 shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-amber-400 text-gray-900 p-1.5 rounded-full shadow">
                      <FaStar className="text-xs" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-wide uppercase">
                      {item.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{item.name}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.tagline}</p>
                  </div>
                </div>

                {/* Story Block with Quote Icon */}
                <div className="relative bg-gray-50 dark:bg-gray-900/60 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 mb-6">
                  <FaQuoteLeft className="text-teal-500/30 text-2xl absolute -top-3 left-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic relative z-10">
                    "{item.story}"
                  </p>
                </div>

                {/* Achievement & Impact Highlights */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                    <FaCheckCircle className="text-teal-500 text-sm flex-shrink-0" />
                    <span>{item.achievement}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                    <FaCheckCircle className="text-teal-500 text-sm flex-shrink-0" />
                    <span>{item.impact}</span>
                  </div>
                </div>
              </div>

              {/* Functional Navigation Action (No Dummy Buttons) */}
              <Link
                to="/campaigns"
                className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl transition-all shadow-md group-hover:shadow-lg text-sm"
              >
                <span>Explore Active Tech Campaigns</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Zoom>
        ))}
      </div>
    </section>
  );
};

export default InnovatorSpotlight;
