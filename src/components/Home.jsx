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
      whyUse: 'Why use QR-menu.rest?',
      offering: 'Our platform is offering 3 different types of handling of your QR code needs:',
      o1: " will generate a QR code specifically for a file you'll upload.",
      o2: ' allows you to generate the only one code and be able to swap a file attached to it (menu updates).',
      o3: ' accepts any URL address and generates a QR for it.',
      span1: 'Single File Upload',
      span2: 'QR Menu',
      span3: 'QR Link',
      howItWorks: 'How it Works?',
      o4: 'Just post the QR code at your establishment on a sign, flyer, or inside your printed menu.',
      o5: 'Customers then scan the code with their smart phone and see your menu right on their phone.',
      o6: 'You get to update prices and items whenever you want, with instant changes reflected on your menus – without incurring webmaster or designer fees.',
    },
    ru: {
      welcome: 'QR-menu.rest',
      signinMessage: 'Чтобы продолжить зайдите в свой аккаунт или зарегистрируйте новый',
      or: 'Или',
      whyUse: 'Преимущества нашей платформы',
      offering: 'Мы предлагаем три разных варианта генирации QR кодов:',
      o1: " генерирует уникальный QR код для конкретного файла.",
      o2: ' позволяет сгенерировать один QR код и менять файлы прикрепленные к нему.',
      o3: ' идеальный вариант если нужен код указывающий на веб адрес.',
      span1: 'Одиночный Файл',
      span2: 'QR Меню',
      span3: 'QR на Ссылку',
      howItWorks: 'Как это работает?',
      o4: 'Разместите полученный код в месте где вы бы хотели что бы его использовали.',
      o5: 'Затем гость сканирует код своим телефоном и получает доступ к меню.',
      o6: 'Удобство вносить любые поправки в меню, которые вступают в силу моментально.',
    }
  }

  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
    }
  }

  const [number, setNumber] = React.useState(3);

  
  const resetNumber = () => {
    document.getElementById('loader').style= 'display:none';
    const currentNumber = parseInt(document.getElementById('iphone').src.split('.png')[0][document.getElementById('iphone').src.split('.png')[0].length - 1]);
    if (currentNumber === 3) {
      setNumber(2)
    } else if (currentNumber === 2) {
      setNumber(1)
    } else if (currentNumber === 1) {
      setNumber(3)
    }
  }

  useEffect(() => {
    checkLoginStatus(props) 
    const interval = setInterval(
      () => resetNumber(),
      3000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const logoStyle = {
    width: "278px",
    height: "200px",
    backgroundImage: "url(/logo.png)",
    backgroundPosition: "center",
  }

  
  return (
    <div className="home-page">

      <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <section style={ logoStyle }>
        </section>
      </div>

      <div className="welcome-text">
        {text[lang].signinMessage}
      </div>
      <Login />
      <br />
      <p style={{fontSize: '26px', color: 'white'}}>{text[lang].or}</p>
      <Signup />
      <br />
      <div style={{display: 'flex', direction: 'column', justifyContent: 'center', flexWrap: 'wrap'}}>
        <img src={`/phone_view${number}.png`} alt="image" style={{zoom: '0.4'}} id='iphone'/>
        <div className="home-description">
          <p className="text-title">{text[lang].whyUse}</p>
          <p className="text">{text[lang].offering}</p>
          <p className="text">1. <span className="home-span-list">{text[lang].span1}</span>{text[lang].o1}</p>
          <p className="text">2. <span className="home-span-list">{text[lang].span2}</span>{text[lang].o2}</p>
          <p className="text">3. <span className="home-span-list">{text[lang].span3}</span>{text[lang].o3}</p>
        </div>
      </div>
      <br />
      <div style={{display: 'flex', direction: 'column', justifyContent: 'center', flexWrap: 'wrap'}}>
        <div className="home-description">
        <p className="text-title">{text[lang].howItWorks}</p>
        <p className="text">{text[lang].o4}</p>
        <p className="text">{text[lang].o5}</p>
        <p className="text">{text[lang].o6}</p>
        </div>
        <img src="/qr_core.png" alt="image" style={{zoom: '0.7', border: '7px solid white'}}/>
      </div>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Home);
