import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import SubNavbar from './SubNavbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SMTable from './SMTable';
import LinksTable from './LinksTable';


function Dashboard(props) {

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  });

  const lang = props.menus.lang
  const text = {
    en: {

    },
    ru: {

    }
  }


  return (
    <>

    {
      props.menus.isDataLoaded ?
      <>
      <SubNavbar />
      <div className='dashboard'>
        <div style={{display: 'flex', direction: 'column', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
          <div  style={{marginBottom: '2rem'}}>
            <Link to="/single-file" style={{textDecoration: 'none'}}>
              <Button
                variant="contained"
                color={props.menus.allFiles.length > 0 ? "primary" : "secondary"}
                startIcon={JSON.stringify(props.menus.allFiles.length)}
                style={{zoom: '1.8', minWidth: '12rem', marginBottom: '2rem'}}
                >
              Single File Upload
              </Button>
            </Link>
            <SMTable data={props.menus.allFiles}/>
          </div>
          <div>
            <Link to="/qr-link" style={{textDecoration: 'none'}}>
              <Button
                variant="contained"
                color={props.menus.qrLinks.length > 0 ? "primary" : "secondary"}
                startIcon={JSON.stringify(props.menus.qrLinks.length)}
                style={{zoom: '1.8', minWidth: '12rem', marginBottom: '2rem'}}
                >
                QR FOR A LINK
              </Button>
            </Link>
            <LinksTable data={props.menus.qrLinks}/>
          </div>
        </div>
      </div>
      </>
      :
      <div className='cp'>
        <CircularProgress  style={{color: '#ffc107'}} />
      </div>
    }
      
    </>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Dashboard));