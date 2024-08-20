import React from 'react';
import { Link } from 'react-router-dom';
import { SignedOut, SignedIn, SignOutButton } from '@clerk/clerk-react';

function Hero() {
  // Define scrollToTop function if needed
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col items-center">
      <nav>
        <div className="flex space-x-4">
          <Link to="/" onClick={scrollToTop} className="btn">Home</Link>
          <Link to="/profile" onClick={scrollToTop} className="btn">Profile</Link>
          <Link to="/mission" onClick={scrollToTop} className="btn">Mission</Link>
          <SignedIn>
            <SignOutButton className="btn" />
          </SignedIn>
        </div>
      </nav>

      <h1 className="text-6xl sm:text-9xl my-20 sm:my-40">Recipe <span>Roots</span></h1>
  
    </section>
  );
}

export default Hero;
