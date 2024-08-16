import React from 'react';

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
  }
];

function Stories(){
  return (
    <div className="flex flex-col items-center">
      <div className="justify-center w-2/3 space-y-20">
      <div className="w-full text-center space-y-4">
        <h2 className="text-6xl">Featured Stories</h2>
        <p className="text-lg">Be inspired by heartfelt stories and delicious recipes from our community around the world.</p>
      </div>

      <div className="space-y-24 w-full">
        {slides.map((slide, index) => (
          <article key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center space-y-12 lg:space-y-0 lg:space-x-12 lg:space-x-reverse bg-black bg-opacity-10  p-8 rounded-lg shadow-lg `}>
            <img src={slide.image} alt={slide.title} className="w-full lg:w-1/2 h-96 object-cover rounded-lg"/>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 space-y-6">
              <h3 className="text-4xl">{slide.title}</h3>
              <p>{slide.text}</p>
              <a href={slide.route} className="btn-dark">Read More</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Stories;
