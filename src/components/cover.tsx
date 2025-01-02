import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src="/window-cleaning/cover.jpeg"
        draggable="false"
        alt="Cover"
        className="w-full h-auto"
      />

      {/* Overlay Section */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center bg-white bg-opacity-75 p-6 md:p-8 rounded-lg max-w-lg md:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Crystal Clear Windows, Every Time
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Professional window cleaning services for your home or business
          </p>
          <Link
            to="/contact"
            className="bg-[#ff8c28] quote-button hover:bg-[#ff9d4d] text-white px-6 sm:px-8 py-3 rounded text-base sm:text-lg font-medium inline-block"
          >
            Get Your Free Quote Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
