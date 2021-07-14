import React, { useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';


const Home = (props) => {

  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
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

  return (
    <div className="home-page">
      <p className="welcome-message">Welcome</p>
      <p className="welcome-text">Sign in or sign up to upload your pdf menu and get a QR code for it for free</p>
      <Login />
      <br />
      <p style={{fontSize: '26px', color: 'white'}}>Or</p>
      <Signup />
    </div>
  );
}

export default Home;
