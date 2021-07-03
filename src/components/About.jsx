import React, { useEffect } from 'react';

const About = () => {

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

      <h3 className='text-title'>
        What is qr-menu.rest?
      </h3>
      <p className='text'>
        qr-menu.rest is a platform for uploading documents and getting a qr code for them.
        It was designed for bars and restaurants to host their menus but it sure not limited to it and everyone is welcome
        on this platform.
      </p>

      <h3 className='text-title'>
        How much does it cost?
      </h3>
      <p className='text'>
        Use of qr-menu.rest is absolutely free!
      </p>

      <h3 className='text-title'>
        What are the benefits of QR menu over paper?
      </h3>
      <p className='text'>
        1. Easy to update and change menus.
      </p>
      <p className='text'>
        2. Save on printing cost.
      </p>
      <p className='text'>
        3. Contactless and touchless experience.
      </p>

    </div>
  );
}

export default About;
