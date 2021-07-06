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
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      <p className='text'>Demo page is coming soon</p>
    </div>
  );
}

export default Demo;
