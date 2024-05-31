import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-25"
          src="https://unsplash.com/photos/white-plates-with-assorted-foods-Q_Moi2xjieU"
          alt="Food on plates"
        />
      </div>
      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center items-center py-20">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Welcome to Recipe Roots
        </h1>
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-md text-center mb-8 animate-fade-in-up-delay">
          Explore authentic family recipes from around the world and preserve culinary traditions.
        </p>
        {/* CTA button */}
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300 animate-fade-in-up-delay">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
