import React from 'react';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { singleFileUpload } from '../actions/menus';
import { connect } from 'react-redux';
import { uploadMenu } from '../actions/menus';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const MenuUpload = (props) => {

  const classes = useStyles();
  const [file, setFile] = React.useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    $('#loader').show(0)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", JSON.parse(localStorage.getItem('token')));
    fetch(`${process.env.REACT_APP_BASE_URL}/upload_file`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => props.dispatch(uploadMenu(response)))
    .then(response => $('#loader').hide(0))
    .then(response => document.querySelector('input').value = '')
    .catch(err => alert(err.message))
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
        type="file" 
        className="btn btn-outline-warning" 
        style={{fontSize: '18px', color: 'white'}}
        accept=".doc, .pdf, image/png, image/jpeg, application/pdf" 
        required
        onChange={(e) => handleImageChange(e)}/>
        <br /> <br />
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        type="submit"
      >
        Upload new file
      </Button>
      </form>
    </>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(MenuUpload);