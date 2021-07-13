import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';


const RenderMenu = (props) => {

  const [state, setState] = React.useState({isDataLoaded: false, menuLink: null, hasFile: false});

  useEffect(() => {
    if(document.getElementsByClassName('makeStyles-root-1')[0]){
      document.getElementsByClassName('makeStyles-root-1')[0].remove();
      document.getElementsByClassName('footer')[0].remove();
    }
    if(document.querySelector('header') && document.querySelector('footer')) {
      document.querySelector('header').remove();
      document.querySelector('footer').remove();
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/get_menu/${document.location.href.split('/')[document.location.href.split('/').length - 1]}`)
    .then(response => setState({isDataLoaded: true, hasFile: response.data.has_file, menuLink: response.data.menu_link}))
    .catch(error => alert(error.message))
  }, []);

  
  return (
    <>
    {
      state.isDataLoaded ?
      <>
      {
        state.hasFile ?
        <div>
          <iframe heigh={window.innerHeight} width={window.innerWidth} src={state.menuLink} className='menu-render'/>
        </div>
        :
        <div>
          <p className='text dashboard'>Sorry, no file at this link</p>
        </div>
      }
      </>
      :
      <>
        <div className='cp'>
          <CircularProgress  style={{color: '#ffc107'}} />
        </div>
      </>
    }
    </>
  );
}

export default withRouter(RenderMenu);
