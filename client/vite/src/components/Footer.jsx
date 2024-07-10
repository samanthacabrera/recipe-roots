import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className="bg-olive-700 text-slate-50 mt-12 pt-4 px-12">
      <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Quick Links */}
          <nav className="text-left flex flex-col space-y-2">
            <h3 className="uppercase">Quick Links</h3>
            <a href="#">Explore</a>
            <a href="#">Featured Stories</a>
            <a href="#">My Cookbook</a>
            <a href="#">Our Mission</a>
          </nav>
        
        {/* Newsletter Signup */}
        <div className="flex flex-col space-y-2 text-left">
          <h3 className="text-xl">Join our newsletter</h3>
          <p className="text-sm pb-4">Stay updated with the latest recipes, culinary tips, and special offers! Join our newsletter for a delicious dose of inspiration delivered straight to your inbox.</p>
          <form className="flex space-x-2">
            <input type="email" className="w-full px-4 py-2 rounded-lg focus:outline-none" placeholder="Your email address" />
            <button type="submit" className="py-2 px-4 rounded-full border focus:outline-none">Subscribe</button>
          </form>
        </div>
        
        {/* Other Links */}
        <nav className="flex flex-col text-right space-y-2">
            <a href="#">Community</a>
            <a href="#">Events</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Donate</a>
        </nav>       
      </div>
      
      <div className="container mx-auto py-4 border-t flex justify-between items-center text-xs">
        <div>
          <p>&copy; 2024 Recipe Roots. All rights reserved.</p>
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
