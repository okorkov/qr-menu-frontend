import React, { useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import { connect } from 'react-redux';


const Home = (props) => {

  const lang = props.menus.lang
  const text = {
    en: {
      welcome: 'Welcome',
      signinMessage: 'Sign in or sign up to upload your pdf menu and get a QR code for it for free',
      or: 'Or',
    },
    ru: {
      welcome: 'Добро Пожаловать',
      signinMessage: 'Чтобы продолжить зайдите в свой аккаунт или зарегистрируйте новый',
      or: 'Или',
    }
  }

  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
    }
  }

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    }
  }

  useEffect(() => {
    checkPath()
    checkLoginStatus(props)
  });

  return (
    <div className="home-page">
      <p className="welcome-message">{text[lang].welcome}</p>
      <p className="welcome-text">{text[lang].signinMessage}</p>
      <Login />
      <br />
      <p style={{fontSize: '26px', color: 'white'}}>{text[lang].or}</p>
      <Signup />
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Home);
