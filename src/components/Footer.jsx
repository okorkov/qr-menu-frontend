import React, { useEffect } from 'react';
import Package from '../../package.json';
import { connect } from 'react-redux';

const Footer = (props) => {

  // const checkPath = () => {
  //   if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
  //     document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
  //   } else {
  //     document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
  //   }
  // }

  const lang = props.menus.lang
  const text = {
    en: {
      name: 'Alex Okarkau',
      licenseMIT: 'Licensed under the MIT License. App v'
    },
    ru: {
      name: 'Александр Окорков',
      licenseMIT: 'Лицензия МИТ. Версия приложения'
    }
  }

  return (
    <footer className='footer text-lg-start fixed'>
      <div className="text-white text-center" >
        <p>© {new Date().getFullYear()} <a target="_blank" href="https://aokarkau.com" style={{color: 'white'}}>{text[lang].name}</a>. {text[lang].licenseMIT}({Package.version})</p>
      </div>
    </footer>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Footer);