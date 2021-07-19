import React, { useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import { connect } from 'react-redux';



const Home = (props) => {

  const lang = props.menus.lang
  const text = {
    en: {
      welcome: 'QR-menu.rest',
      signinMessage: 'Sign in or sign up to upload your pdf menu and get a QR code for it for free',
      or: 'Or',
    },
    ru: {
      welcome: 'QR-menu.rest',
      signinMessage: 'Чтобы продолжить зайдите в свой аккаунт или зарегистрируйте новый',
      or: 'Или',
    }
  }

  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  });

  return (
    <div className="home-page">
      <p className="welcome-message ">{text[lang].welcome}</p>
      <p className="welcome-text">{text[lang].signinMessage}</p>
      <Login />
      <br />
      <p style={{fontSize: '26px', color: 'white'}}>{text[lang].or}</p>
      <Signup />
      <br />
      <div style={{display: 'flex', direction: 'column', justifyContent: 'center', flexWrap: 'wrap'}}>
        <img src="/phone_view.png" alt="image" style={{zoom: '0.4'}}/>
        <div className="home-description">
          <p className="text-title"> Why use QR-menu.rest ?</p>
          <p className="text"> Our platform is offering 3 different types of handling of your QR code needs: </p>
          <p className="text">1. <span style={{fontWeight: 'bold', color: '#ffc107'}}>Single File Upload</span> will generate a QR code specifically for a file you'll upload.</p>
          <p className="text">2. <span style={{fontWeight: 'bold', color: '#ffc107'}}>QR Menu</span> allows you to generate the only one code and be able to swap a file attached to it (menu updates).</p>
          <p className="text">3. <span style={{fontWeight: 'bold', color: '#ffc107'}}>QR Link</span> accepts any URL address and generates a QR for it.</p>
        </div>
      </div>
      <br />
      <div style={{display: 'flex', direction: 'column', justifyContent: 'center', flexWrap: 'wrap'}}>
        <div className="home-description">
        <p className="text-title">How it Works ?</p>
        <p className="text">Just post the QR code at your establishment on a sign, flyer, or inside your printed menu.</p>
        <p className="text">Customers then scan the <span style={{fontWeight: 'bold'}}>code </span> with their smart phone and see your menu right on their phone.</p>
        <p className="text">You get to update <span style={{fontWeight: 'bold'}}>prices</span> and <span style={{fontWeight: 'bold'}}>items</span> whenever you want, with instant changes reflected on your menus – without incurring webmaster or designer fees.
</p>
        </div>
        <img src="/qr_core.png" alt="image" style={{zoom: '0.7'}}/>
      </div>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Home);
