import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: "Meet Rosa",
    image: "",
    text: "Rosa has been making traditional tortillas for over 50 years. Her recipe has been passed down through generations, preserving the authentic flavors and techniques. Discover her story and learn to make her cherished tortillas.",
    buttonText: "Read more"
  },
  {
    title: "Meet Aiko",
    image: "",
    text: "Aiko is a master of sushi making. Growing up in Tokyo, she learned the art of sushi from her father, a renowned sushi chef. She continues to honor her family's legacy by sharing the delicate and precise techniques of sushi preparation.",
    buttonText: "Read more"
  },
  {
    title: "Meet Ida",
    image: "./././danie-franco-l9I93gZKTG4-unsplash.jpg",
    text: "Ida hails from a small village in Tuscany where pasta making is a revered tradition. Her pasta recipes are crafted with love and the freshest ingredients, reflecting the rich culinary heritage of her homeland. Join Ida in his kitchen and learn the secrets of perfect pasta.",
    buttonText: "Read more"
  }
];

const Stories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
                backgroundImage: `url(${slide.image})`,
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white space-y-8">
            <h1 className="text-3xl md:text-4xl font-light mb-2">{slide.title}</h1>
            <p className="text-sm md:text-base mb-2 text-center max-w-md mx-auto">
              {slide.text}
            </p>
            <button className="mt-2 px-6 py-2 bg-olive-600 text-white font-bold text-base rounded-full hover:bg-olive-700 transition duration-300">
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
    <div className="absolute inset-0 flex justify-between items-center px-4">
        <button onClick={prevSlide} className="bg-olive-600 text-white px-4 py-2 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-olive-600 focus:ring-opacity-50">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        </button>
        <button onClick={nextSlide} className="bg-olive-600 text-white px-4 py-2 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-olive-600 focus:ring-opacity-50">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
        </button>
    </div>
    
<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
  {slides.map((_, index) => (
    <button
      key={index}
      className={`w-8 h-1 rounded-lg ${currentSlide === index ? 'bg-gray-100' : 'bg-gray-400'} transition duration-300`}
      onClick={() => setCurrentSlide(index)}
    ></button>
  ))}
</div>

    
    </div>
  );
};

export default Stories;
