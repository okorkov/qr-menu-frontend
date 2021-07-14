import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { signupUser } from '../actions/user';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import ErrorMessage from './ErrorMessage';
import $ from 'jquery';

function PaperComponent(props) {
  return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
  );
}

function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [signup, setSignup] = React.useState({email: '', password: '', password_confirmation: ''});
  const [renderError, setRenderError] = React.useState({hasErrors: false, errors: []});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleLoginSubmit = (e) => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/users`, signup)
    .then(response => autentication(response))
    .then(response => $('#loader').hide(0))
    .catch(error => alert(error.message))
    
  }

  const handleSignupInput = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    })
  }

  const autentication = (response) => {
    if(response.data.errors) {
      setRenderError({
        hasErrors: true,
        errors: response.data.errors
      })
    }
    props.dispatch(signupUser(response))
    if(response.data.logged_in){
      props.history.push('/dashboard')
    }
  }

  const loader = () => {
    $('#loader').show(0)
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    setOpen(false);
    $('#loader').show(0)
    handleLoginSubmit()
  }

  return (
    <div >
      {renderError.hasErrors ? <ErrorMessage errors={renderError.errors}/> : null}
      <Button variant="contained" color="primary" onClick={handleClickOpen}> SIGN UP  </ Button >
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Create a new account
        </DialogTitle>
        <form className="form-signup" >
        <DialogContent>
        
        <TextField label="Email" type="email" value={signup.email} name="email"  onChange={(e) => handleSignupInput(e)}/>
        <br />
        <TextField label="Password" type="password" value={signup.password} name="password" onChange={(e) => handleSignupInput(e)}/>
        <br />
        <TextField label="Password Confirmation" type="password" value={signup.password_confirmation} name="password_confirmation" onChange={(e) => handleSignupInput(e)}/>
        <br />

        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleSignUp(e)} color="primary" type="submit">
            Register
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(DraggableDialog));