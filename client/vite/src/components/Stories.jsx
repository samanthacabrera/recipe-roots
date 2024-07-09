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


  return (
    <div>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            height: '200vh'
         
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <div className="absolute bottom-24 space-y-4 text-white">
              <h1 className="text-7xl">{slide.title}</h1>
              <p> {slide.text} </p>
              <button className="text-xs p-2 rounded outline w-fit mb-4">read more</button>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;


