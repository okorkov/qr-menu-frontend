import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-category">
        <p className='footer-link' href="/">Home</p>
      </div>
      <div className="footer-category">
        <p className='footer-link' href="/about">About</p>
      </div>
      <div className="footer-category">
        <p className='footer-link' href="/contact">Contact</p>
      </div>
    </div>
  );
}

export default Footer;
