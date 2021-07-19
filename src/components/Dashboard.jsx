import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import SubNavbar from './SubNavbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import DashboardAccordion from './DashboardAccordion'

function Dashboard(props) {

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  });

  return (
    <>

    {
      props.menus.isDataLoaded ?
      <>
      <SubNavbar />
      <div className='dashboard'>
        <DashboardAccordion data={props.menus}/>
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