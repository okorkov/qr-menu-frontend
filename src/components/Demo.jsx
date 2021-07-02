import React, { useEffect } from 'react';


const Demo = () => {

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }
  
  useEffect(() => {
    checkPath()
  }, []);

  return (
    <div>
      Demo page
    </div>
  );
}

export default Demo;
