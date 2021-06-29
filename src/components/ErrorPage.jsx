import React from 'react';
import { withRouter } from "react-router";

const ErrorPage = (props) => {

  const handleClick = (history) => {
    history.push('/')
  }

  return (
    <div className="error-page">
      <h3 className='error-page-text'>Page not found</h3>
      <p className="home-link" onClick={() => handleClick(props.history)}>Home Page</p>
    </div>
  );
}

export default withRouter(ErrorPage);
