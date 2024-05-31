import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: "Meet Elsa Cabrera",
    image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717089424/ElsaCabrera.jpg",
    text: "Join Elsa in discovering the rich flavors and traditional techniques that make her pupusas so special.",
    route: "/recipes/1",
  },
  {
    title: "Meet Alice Widman",
    image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092157/AliceWidman.jpg",
    text: "Learn how to make these delicious Danish pancakes, a favorite treat for Alice's family.",
    route: "/recipes/2",
  },
  {
    title: "Meet Augusto Romano",
    image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092325/AugustoRomano.jpg",
    text: "Experience the authentic taste of Italy as Augusto guides you through the process of making this classic sauce.",
    route: "/recipes/3",
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

  const handleClick = () => {
    console.log('Button clicked!');
  };



  return (
    <div className="w-screen h-screen relative mb-96">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            height: '150vh'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white space-y-4">
            <h1 className="translate-y-96 text-2xl md: font-light mb-2">{slide.title}</h1>
            <p className="translate-y-96 text-sm md:text-base text-center max-w-md mx-auto">
              {slide.text}
            </p>

            {/* <button className="translate-y-96 p-2 rounded outline w-fit" onClick={handleClick}>Read More</button> */}

          </div>
        </div>
      ))}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button onClick={prevSlide} className="text-white px-4 py-2 translate-y-64 transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-olive-600 focus:ring-opacity-50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button onClick={nextSlide} className="text-white px-4 py-2 translate-y-64 transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-olive-600 focus:ring-opacity-50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 translate-y-80 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-32 h-1 rounded-lg ${currentSlide === index ? 'bg-gray-100' : 'bg-gray-400'} transition duration-300`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Stories;


