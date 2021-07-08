import React from 'react';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const FileUpload = (props) => {

  const classes = useStyles();
  const [file, setFile] = React.useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  }

  const loader = () => {
    $('#loader').show(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", JSON.parse(localStorage.getItem('token')));
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/menus`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => props.setLastMenu({hasMenu: true, pdfMenu: response.pdf_file, qrCode: response.qr_code, uploaded: response.uploaded}))
    .then(response => $('#loader').hide(0))
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
        onClick={loader}
        type="submit"
      >
        Upload new file
      </Button>
      </form>
    </>
  );
}

export default FileUpload;
