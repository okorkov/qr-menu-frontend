import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
  return (
    <div className="centered">
      <p className="welcome-message">Welcome</p>
      <Login />

      <Signup />
    </div>
  );
}

export default Home;
