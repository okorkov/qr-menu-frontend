import React from 'react';
import { withRouter } from "react-router";

const Footer = (props) => {

  const HandleRedirect = (history, action) => {
    history.push(action)
  }

  return (
    <div className='footer'>
      <div className="footer-category">
        <p className='footer-link' onClick={() => HandleRedirect(props.history, '/')}>Home</p>
      </div>
      <div className="footer-category">
        <p className='footer-link' onClick={() => HandleRedirect(props.history, '/about')}>About</p>
      </div>
      <div className="footer-category">
        <p className='footer-link' onClick={() => HandleRedirect(props.history, '/contact')}>Contact</p>
      </div>
    </div>
  );
}

export default withRouter(Footer);
