import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import FileUpload from './FileUpload';



const Dashboard = (props) => {

  const [lastMenu, setLastMenu] = React.useState({hasMenu: false, pdfMenu: null, qrCode: null});
  const [menus, setMenus] = React.useState({menus: []});

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
    }
  }


  useEffect(() => {
    checkLoginStatus(props)
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/find_menus`, {token: JSON.parse(localStorage.getItem('token'))})
    .then((response) => handleData(response.data))
    .catch(err => alert(err.message))
  }, []);

  return (
    <div className='dashboard'>
      {
      !lastMenu.hasMenu ?
      <p className='text'>There is no file uploaded</p>
      :
      <>
      <div className='menu'>
        <div style={{margin: '2%'}}>
          <p className='text'>QR Code:</p>
          <iframe className='qrcode' src={lastMenu.qrCode}></iframe>
          <br/>
          <button className='btn btn-info' style={{marginTop: '15%'}}>Re-send this QR Code to my email</button>
        </div>
        <div style={{margin: '2%'}}>
          <p className='text'>File:</p>
          <iframe className='pdf' src={lastMenu.pdfMenu} ></iframe>
        </div>
      </div>
        <p className='text' style={{paddingTop: '3%'}}>Upload new File</p>
      </>
      }
      <FileUpload setLastMenu={setLastMenu}/>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter( Dashboard));
