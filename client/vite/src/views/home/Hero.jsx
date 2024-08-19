import React, { useEffect, useState } from 'react';


function Hero() {
  const slides = [
    {
      image: 'url_to_your_first_image.jpg',
      text: 'Discover the roots of family traditions through cherished recipes.'
    },
    {
      image: 'url_to_your_second_image.jpg',
      text: 'Preserving the flavors that connect generations.'
    },
    {
      image: 'url_to_your_third_image.jpg',
      text: 'A journey through the culinary heritage of your ancestors.'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <section 
      className="hero" 
      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
    >
      <div className="overlay">
        <h1 className="hero-title">Recipe Roots</h1>
        <p className="hero-text">{slides[currentSlide].text}</p>
      </div>
    </section>
  );
}

export default Hero;
