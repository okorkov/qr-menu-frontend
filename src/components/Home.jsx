import React, { useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';


const Home = (props) => {

  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  });

  return (
    <div className="centered">
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
