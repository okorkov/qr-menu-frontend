import React, { useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
// import { connect } from 'react-redux';
// import { withRouter } from "react-router";



const Demo = (props) => {

  const [demo, setDemo] = React.useState({dataLoaded: false, data: {}});

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }
  
  useEffect(() => {
    checkPath()
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/demo`)
    .then(response => setDemo({dataLoaded: true, data: response.data}))
    .catch(error => alert(error.message))
  }, []);

  const handleDemoUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/demo_upload`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => setDemo({...demo, data: response}))
    .then(response => $('#loader').hide(0))
    .catch(err => alert(err.message))
  }

  const [file, setFile] = React.useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  }

  const loader = () => {
    $('#loader').show(0)
  }

  return (
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      {
        demo ?
        <>
        <p className='text-title'>This is a demo page, please don't use it for hosting your documents.</p>
        <div className='menu'>
              <div style={{margin: '2%'}}>
                <p className='text'>QR Code:</p>
                <img className='qrcode' src={demo.data.qr_code}></img>
                <br/> <br />
                <a href={demo.data.qr_code} target="_blank">Link to QR Code</a>
                <br />
                <button 
                id='resend-qr'
                className='btn btn-success'
                style={{marginTop: '15%'}}
                disabled>
                Re-send this QR Code to my email (Disabled in demo mode)
                </button>
              </div>
              <div style={{margin: '2%'}}>
                <p className='text'>File:</p>
                <iframe className='pdf' src={demo.data.pdf_file} ></iframe>
              </div>
            </div>
              <p className='text' style={{paddingTop: '3%'}}>Upload new File</p>
              <form onSubmit={(e) => handleDemoUpload(e)}>
                <input
                type="file" 
                className="btn" 
                style={{fontSize: '18px', color: 'white'}}
                name="menu" 
                accept=".doc, .pdf, image/png, image/jpeg, application/pdf" 
                required
                onChange={(e) => handleImageChange(e)}/>
                <br /> <br />
                <button type="submit" className="btn btn-warning" onClick={loader}>Upload</button>
              </form>
        </>
        :
        <CircularProgress />
      }
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

// export default connect(mapStateToProps)(withRouter(Demo));
export default Demo;

