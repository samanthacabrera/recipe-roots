import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer bg-olive-700 text-white pt-8 py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h6 className="mb-2">About</h6>
            <p className="font-light text-justify">We believe that preserving family recipes is crucial to staying connected to our roots. Each recipe on our platform is a piece of history, a testament to the resilience, creativity, and love of those who came before us. By sharing these recipes, we honor our ancestors and keep their spirits alive in our kitchens.</p>
          </div>
          {/* Quick Links */}
          <div>
            <h6 className="mb-2">Quick Links</h6>
            <ul className="font-light footer-links">
              <li><a href="/">Explore</a></li>
              <li><a href="/">Cookbook</a></li>
              <li><a href="/">Mission</a></li>
            </ul>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
          {/* Copyright */}
          <div className="text-left text-sm text-gray-100">
            <p className="copyright-text">Recipe Roots® 2024
          
            </p>
          </div>
          {/* Social Icons */}
          <div className="text-right">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a className="dribbble" href="#"><i className="fab fa-dribbble"></i></a></li>
              <li><a className="linkedin" href="#"><i className="fab fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
