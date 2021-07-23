import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { loginUser } from '../actions/user';
import ErrorMessage from './ErrorMessage';
import $ from 'jquery';
import Button from '@material-ui/core/Button';

const Login = (props) => {

  const lang = props.menus.lang
  const text = {
    en: {
      error: 'Email or Password is incorrect',
      emailLabel: "Email",
      passwordLabel: "Password",
      loginButton: 'Login',
    },
    ru: {
      error: 'Имейл или пароль введены неверно',
      emailLabel: "Имейл адрес",
      passwordLabel: "Пароль",
      loginButton: 'Войти',
    }
  }

  const [renderError, setRenderError] = React.useState(false);
  const [login, setLogin] = React.useState({email: '', password: ''});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, login)
    .then(response => autentication(response))
    .then(response => $('#loader').hide(0))
    .catch(error => alert(error.message))
  }

  const handleLoginInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const autentication = (response) => {
    if(response.data.errors) {
      setRenderError(true)
    }
    if(response.data.logged_in) {
      props.dispatch(loginUser(response))
      props.history.push('/dashboard')
    }
  }

  const loader = () => {
    $('#loader').show(0)
  }

  return (
    <>
      {renderError ? <ErrorMessage errors={{email: [text[lang].error]}}/> : null}
      <form className="form" onSubmit={(e) => handleLoginSubmit(e)}>
        <TextField label={text[lang].emailLabel} type="email" value={login.email} name="email"  onChange={(e) => handleLoginInput(e)}/>
        <TextField label={text[lang].passwordLabel} type="password" value={login.password} name="password" onChange={(e) => handleLoginInput(e)}/>
        <br />
        <Button variant="contained" style={{backgroundColor: '#e3a765'}} type='submit' onClick={loader}> {text[lang].loginButton} </ Button >
      </form>
    </>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Login));
