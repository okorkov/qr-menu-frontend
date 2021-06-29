import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
  return (
    <div className="centered">
      <p className="welcome-message">Welcome</p>
      <p className="welcome-text">Sign in or sign up to upload your pdf menu and get a qr code for it</p>
      <Login />
      <br />
      <p style={{fontSize: '26px', color: 'white'}}>Or</p>
      <Signup />
    </div>
  );
}

export default Home;
