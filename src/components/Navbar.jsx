import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';


const Navbar = (props) => {
  const HandleRedirect = (history, action) => {
    history.push(action)
  }
  return (
    <div className='navbar'>
      <div className="navbar-category">
        <p className='navbar-link' id='home' onClick={() => HandleRedirect(props.history, (props.menus.logged_in)? '/dashboard' : '/')}>Home</p>
      </div>
      <div className="navbar-category">
        <p className='navbar-link' id='about' onClick={() => HandleRedirect(props.history, '/about')}>About</p>
      </div>
      {props.menus.logged_in ?
      null
      :
      <div className="navbar-category">
        <p className='navbar-link' id='demo' onClick={() => HandleRedirect(props.history, '/demo')}>Demo</p>
      </div>
      }
      <div className="navbar-category">
        <p className='navbar-link' id='contact' onClick={() => HandleRedirect(props.history, '/contact')}>Contact</p>
      </div>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Navbar));
