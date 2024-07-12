import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className="bg-olive-600 text-slate-50 mt-24 px-12">
      <div className="container mx-auto pt-8 flex justify-start items-center">
          <h2 className="text-4xl"> Recipe Roots</h2>
      </div>
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Links */}
          <nav className="text-left flex flex-col space-y-4">
            <h3>Quick Links</h3>
            <a href="/">Explore</a>
            <a href="/stories">Featured Stories</a>
            <a href="/profile">My Cookbook</a>
            <a href="/mission">Our Mission</a>
          </nav>
        {/* Newsletter Signup */}
        <div className="flex flex-col space-y-4 text-left">
          <h3 className="text-xl">Join our newsletter</h3>
          <p className="text-sm leading-loose pb-4">Stay updated with the latest recipes, culinary tips, and free online events! Join our newsletter for a dose of inspiration delivered straight to your inbox.</p>
          <form className="flex space-x-4">
            <input type="email" className="w-full px-4 py-2 rounded-lg focus:outline-none" placeholder="Your email address" />
            <button type="submit" className="py-2 px-4 rounded-full border focus:outline-none">Subscribe</button>
          </form>
        </div>
        {/* Other Links */}
        <nav className="flex flex-col text-right space-y-4">
          <a href="#">Community</a>
          <a href="#">Events</a>
          <a href="#">Donate</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </nav>       
      </div>
      
      <div className="container mx-auto py-4 border-t flex justify-between items-center">
        <div>
          <p className="text-xs">&copy; 2024 Recipe Roots. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook}  /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faPinterest} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
