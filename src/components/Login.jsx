import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const Login = () => {
  return (
    <div className="form">
        <TextField  label="Email" type="email" />
        <TextField  label="Password"  type="password"/>
        <br />
      <button className='btn btn-success'>Login</button>
    </div>
  );
}

export default Login;
