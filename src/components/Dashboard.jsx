import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import FileUpload from './FileUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logOut } from '../actions/user';



const Dashboard = (props) => {

  const [lastMenu, setLastMenu] = React.useState({hasMenu: false, pdfMenu: null, qrCode: null});
  const [menus, setMenus] = React.useState({menus: []});
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [showResendButton, setShowResendButton] = React.useState(true)

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  const handleData = (data) => {
    if(data.last_menu){
      setLastMenu({
        hasMenu: data.last_menu.has_menu,
        pdfMenu: data.last_menu.pdf_file,
        qrCode: data.last_menu.qr_code
      })
      setIsDataLoaded(true)
    }
  }

  const handleResend = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/resend_qr_code`, {token: JSON.parse(localStorage.getItem('token'))})
    .catch(err => alert(err.message))
    setShowResendButton(false)
    const timeId = setTimeout(() => {
      setShowResendButton(true)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }

  const handleLogOut = () => {
    props.dispatch(logOut())
    localStorage.clear();
    props.history.push('/')
  }


  useEffect(() => {
    checkPath()
    checkLoginStatus(props)
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/find_menus`, {token: JSON.parse(localStorage.getItem('token'))})
    .then((response) => handleData(response.data))
    .catch(err => alert(err.message))
  }, []);

  return (
    <div className='dashboard'>
      {
        isDataLoaded ?
          !lastMenu.hasMenu ?
          <p className='text'>There is no file uploaded</p>
          :
          <>
          <div className='menu'>
            <div style={{margin: '2%'}}>
              <p className='text'>QR Code:</p>
              <img className='qrcode' src={lastMenu.qrCode}></img>
              <br/> <br />
              <a href={lastMenu.qrCode} target="_blank">Link to QR Code</a>
              <br />
              <button 
              id='resend-qr'
              className='btn btn-success'
              style={{marginTop: '15%'}}
              onClick={(e) => handleResend(e)}
              disabled={!showResendButton}>
              Re-send this QR Code to my email
              </button>
            </div>
            <div style={{margin: '2%'}}>
              <p className='text'>File:</p>
              <iframe className='pdf' src={lastMenu.pdfMenu} ></iframe>
            </div>
          </div>
            <p className='text' style={{paddingTop: '3%'}}>Upload new File</p>
          </>
        :
        <>
        <CircularProgress style={{color: '#ffc107'}}/>
        <p className='text' style={{paddingTop: '3%'}}>Loading, please wait.</p>
        </>
      }
      <FileUpload setLastMenu={setLastMenu}/>
      <button className='btn btn-danger log-out' onClick={handleLogOut}>Log out</button>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter( Dashboard));
