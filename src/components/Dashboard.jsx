import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';


const Dashboard = (props) => {

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  });

  return (
    <div>
      Dashboard
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter( Dashboard));
