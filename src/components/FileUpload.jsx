import React from 'react';
import $ from 'jquery';
import { makeStyles } from '@material-ui/core/styles';
import { singleFileUpload } from '../actions/menus';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const FileUpload = (props) => {

  const classes = useStyles();

  const lang = props.menus.lang
  const text = {
    en: {
      fileTooBig: 'File is too big! Keep it under 5 MB',
      fileName: 'Enter File Name',
    },
    ru: {
      fileTooBig: 'Файл слишком большой, лимит 5 МБ',
      fileName: 'Введите имя файла',
    }
  }


  const handleImageChange = (e) => {
    if (e.target.files[0].size > 5e+6) {
      alert(text[lang].fileTooBig);
      document.querySelectorAll('input')[1].value = '';
      return null;
    }
    let fileName
    fileName = window.prompt(text[lang].fileName);
    if (fileName === null){
      console.log(document.querySelector('input').value)
      document.querySelectorAll('input')[1].value = '';
      return null;
    } else {
      $('#loader').show(0)
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("file_name", fileName);
      formData.append("token", JSON.parse(localStorage.getItem('token')));
      e.target.value = '';
      fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/menus`, {
        method: 'POST',
        body: formData
      })
      .then(data => data.json())
      .then(response => props.dispatch(singleFileUpload(response)))
      .then(response => $('#loader').hide(0))
      .then(response => document.querySelectorAll('input')[1].value = '')
      .catch(err => alert(err.message))
    }
  }


  return (
    <>
      <form >
        <input
        type="file" 
        className="btn btn-outline-warning" 
        style={{fontSize: '18px', color: 'white'}}
        accept=".doc, .pdf, image/png, image/jpeg, application/pdf" 
        required
        onChange={(e) => handleImageChange(e)}/>
        <br /> <br />
      </form>
    </>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(FileUpload);