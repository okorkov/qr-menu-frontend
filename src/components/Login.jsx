import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { loginUser } from '../actions/user';

const Login = (props) => {

  const [login, setLogin] = React.useState({email: '', password: ''});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, login, {withCredentials: true})
    .then(response => autentication(response)).catch(error => alert(error.message))
  }

  const handleLoginInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const autentication = (response) => {
    if(response.data.logged_in) {
      props.dispatch(loginUser(response))
      props.history.push('/dashboard')
    }
  }

  return (
    <>
      <form className="form" onSubmit={(e) => handleLoginSubmit(e)}>
        <TextField label="Email" type="email" value={login.email} name="email"  onChange={(e) => handleLoginInput(e)}/>
        <TextField label="Password" type="password" value={login.password} name="password" onChange={(e) => handleLoginInput(e)}/>
        <br />
        <button className='btn btn-success' type='submit'>Login</button>
      </form>
    </>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Login));
