import React, { useEffect } from 'react';

const Footer = () => {

  // const checkPath = () => {
  //   if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
  //     document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
  //   } else {
  //     document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
  //   }
  // }


  useEffect(() => {
    // checkPath()
  }, []);

  return (
    <footer className='footer text-lg-start'>
      <div className="text-white text-center" >
        <p>© {new Date().getFullYear()} Alex Okarkau. Licensed under the MIT License.</p>
      </div>
    </footer>
  );
}

export default Footer;
