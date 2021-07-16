import React from 'react';
import SubNavbar from './SubNavbar';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Qrlinks = (props) => {

  const lang = props.menus.lang
  const text = {
    en: {
      description: "QR for a link will allow you to generate QR code for any given link you'll provide.",

    },
    ru: {
      description: "Сгенерировать QR код на веб адрес, пример: https://qr-menu.rest/about",

    }
  }

  const [input, setInput] = React.useState({link: ''});

  const handleInputSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/links`, {input: input.link, token: JSON.parse(localStorage.getItem('token'))})
    .then(response => console.log(response))
    .catch(error => alert(error.message))
  }

  const handleInput = (e) => {
    setInput({
      [e.target.name]: e.target.value
    })
  }

  return (

    <div>
      <SubNavbar />
      <p className="text menu-description">
        {text[lang].description}
      </p>
      <form className="form" onSubmit={(e) => handleInputSubmit(e)}>
        <TextField label='enter link' type="text" value={input.link} name="link"  onChange={(e) => handleInput(e)}/>
        <br />
        <Button variant="contained" color="primary" type='submit' > Generate QR Link </ Button >
      </form>
    </div>

  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Qrlinks);