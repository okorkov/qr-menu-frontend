import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import FileUpload from './FileUpload';



const Dashboard = (props) => {

  const [lastMenu, setLastMenu] = React.useState({menu: null, pdfMenu: null});
  const [menus, setMenus] = React.useState({menus: []});

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  const handleData = (data) => {
    if(data.lastMenu){
      setLastMenu({
        menu: data.lastMenu.menu,
        pdfMenu: data.lastMenu.pdf_file
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
      !lastMenu.menu ?
      <p style={{color: 'white', fontSize: '36px'}}>There is no file uploaded</p>
      :
      <p>there is menu</p>
      }
      <FileUpload />
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter( Dashboard));
