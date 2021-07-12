import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import SubNavbar from './SubNavbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const MenuComponent = () => {

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }

  useEffect(() => {
    checkPath()
  });


  return (
    <div>
      <SubNavbar />
      <p className="text menu-description"> 
      Manage QR Menu is a feature that will allow you to generate only one QR code 
      and being able to change the file attached to it. This a great option to manage a 
      restaurant menu and being able to seamlessly make changes during hours of service. If this is not working for you, please refer to a <Link to="/single-file" style={{color: 'white', textDecoration: 'underline'}}>SINGLE FILE UPLOAD</Link>.
      </p>
      Menu Component Here
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(MenuComponent));
