import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import SubNavbar from './SubNavbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import $ from 'jquery';
import { generateQR } from '../actions/menus';

const MenuComponent = (props) => {

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }

  useEffect(() => {
    checkPath()
    checkLoginStatus(props)
  });

  const handleGenerateQR = () => {
    $('#loader').show(0)
    axios.post(`${process.env.REACT_APP_BASE_URL}/generate_qr_for_menu`, {token: JSON.parse(localStorage.getItem('token')), domain: props.menus.domainLink})
    .then(response => props.dispatch(generateQR(response.data)))
    .then(response => $('#loader').hide(0))
    .catch(err => alert(err.message))
  }


  return (
    <>
    {
      props.menus.isDataLoaded ?
        <>
        <SubNavbar />
        <p className="text menu-description"> 
        Manage QR Menu is a feature that will allow you to generate only one QR code 
        and being able to change the file attached to it. This a great option to manage a 
        restaurant menu and being able to seamlessly make changes during hours of service. If this is not working for you, please refer to a <Link to="/single-file" style={{color: 'white', textDecoration: 'underline'}}>SINGLE FILE UPLOAD</Link>.
        </p>
        <div style={{textAlign: 'center', justifyContent: 'center', paddingTop: '10%'}}>
        {
          props.menus.menuQRLink ?
          <p className="text">There is file and go ahead and render it</p>
          :
          <>
            <p className="text" style={{color: '#ffc107'}}>Seems like you don't have QR generated for you yet, go ahead a create one by clicking the button below:</p>
            <button className="btn btn-success" onClick={handleGenerateQR}>Generate QR</button>
          </>
        }
        </div>
        </>
      :
      <div className='cp'>
        <CircularProgress  style={{color: '#ffc107'}} />
      </div>
    }
    </>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(MenuComponent));
