// import React, { useState, useEffect } from 'react';

// const slides = [
//   {
//     title: "Meet Elsa Cabrera",
//     image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717089424/ElsaCabrera.jpg",
//     text: "Join Elsa in discovering the rich flavors and traditional techniques that make her pupusas so special.",
//     route: "/recipes/1",
//   },
//   {
//     title: "Meet Alice Widman",
//     image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092157/AliceWidman.jpg",
//     text: "Learn how to make these delicious Danish pancakes, a favorite treat for Alice's family.",
//     route: "/recipes/2",
//   },
//   {
//     title: "Meet Augusto Romano",
//     image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092325/AugustoRomano.jpg",
//     text: "Experience the authentic taste of Italy as Augusto guides you through the process of making this classic sauce.",
//     route: "/recipes/3",
//   }
// ];

// const Stories = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);


//   return (
//     <div className="space-y-12">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
//           style={{
//             backgroundImage: `url(${slide.image})`,
//             backgroundRepeat: 'no-repeat', 
//             backgroundSize: 'cover', 
//             backgroundPosition: 'center',
//             height: '100vh',
//             width: '100vw'
            
//           }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
//             <div className="absolute bottom-24 space-y-4 text-white">
//               <h1 className="text-7xl">{slide.title}</h1>
//               <p> {slide.text} </p>
//               <button className="text-xs p-2 rounded outline w-fit mb-4">read more</button>
//             </div>
            
//           </div>
//         </div>
//       ))}
//     </div>

//   );
// };

// export default Stories;


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
  },
  {
    title: "Meet Augusto Romano",
    image: "https://res.cloudinary.com/dqwkvvhaq/image/upload/v1717092325/AugustoRomano.jpg",
    text: "Experience the authentic taste of Italy as Augusto guides you through the process of making this classic sauce.",
    route: "/recipes/3",
  }
];

const Stories = () => {
  return (
    <div className="flex flex-col items-center p-24 space-y-40">

      <div className="w-full text-center">
        <h2 className="text-6xl font-semibold">Discover Featured Stories</h2>
        <p className="text-xl mt-8">Be inspired by heartfelt stories and delicious recipes from our community around the world.</p>
      </div>

      <div className="space-y-24 w-full">
        {slides.map((slide, index) => (
          <article key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center space-y-12 lg:space-y-0 lg:space-x-12 lg:space-x-reverse bg-white p-8 rounded-lg shadow-lg border border-gray-200`}>
            <img src={slide.image} alt={slide.title} className="w-full lg:w-1/2 h-96 object-cover rounded-lg"/>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 space-y-6">
              <h3 className="text-4xl">{slide.title}</h3>
              <p>{slide.text}</p>
              <a href={slide.route} className="border border-current p-1 rounded hover:-translate-y-1 transition ease-in-out">Read More</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Stories;
