import React from 'react';
import { Link } from 'react-router-dom';
import { SignedOut, SignedIn, SignOutButton } from '@clerk/clerk-react';

function Hero() {
  // Define scrollToTop function if needed
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col items-center justify-center py-24">

      <h1 className="text-6xl sm:text-9xl hover:scale-105 transition duration-500 translate-y-3/4 uppercase">Recipe <span className="text-green-100 opacity-50">Roots</span></h1>
  
    </section>
  );
}

export default Hero;
