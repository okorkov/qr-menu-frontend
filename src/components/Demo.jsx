import React, { useEffect } from 'react';
import FileUpload from './FileUpload'



const Demo = () => {

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }
  
  useEffect(() => {
    checkPath()
  }, []);

  return (
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      <p className='text-title'>This is a demo page, please don't use it for hosting your documents.</p>
      <div className='menu'>
            <div style={{margin: '2%'}}>
              <p className='text'>QR Code:</p>
              <img className='qrcode' src={'#'}></img>
              <br/> <br />
              <a href={'#'} target="_blank">Link to QR Code</a>
              <br />
              <button 
              id='resend-qr'
              className='btn btn-success'
              style={{marginTop: '15%'}}
              onClick={(e) => console.log('click file upload')}
              disabled>
              Re-send this QR Code to my email
              </button>
            </div>
            <div style={{margin: '2%'}}>
              <p className='text'>File:</p>
              <iframe className='pdf' src={'#'} ></iframe>
            </div>
          </div>
            <p className='text' style={{paddingTop: '3%'}}>Upload new File</p>
      <FileUpload />
      <button className='btn btn-danger log-out' onClick={(e) => console.log('click file upload')}>Log out</button>
    </div>
  );
}

export default Demo;
