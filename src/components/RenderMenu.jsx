import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewSDKClient from './SDKclient';

const RenderMenu = (props) => {

  const [state, setState] = React.useState({isDataLoaded: false, menuLink: null, hasFile: false});
  const [noFile, setNoFile] = React.useState('Sorry, no file at this link');

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

    const interval = setInterval(
      () => resetNoFile(),
      3000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const resetNoFile = () => {
    const file = document.getElementById("no-file").innerHTML;
    if (file === 'Sorry, no file at this link') {
      setNoFile('Файл не добавлен');
    } else {
      setNoFile('Sorry, no file at this link');
    }
  }

  const loadPDF = () => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false, 
        showDownloadPDF: false, showPrintPDF: false}, state.menuLink);
    });
  }
  
  return (
    <div >
    {
      state.isDataLoaded ?
      <div>
      {
        state.hasFile ?
        <>
          <div id="pdf-div" className="full-window-div" onDocumentLoad={loadPDF()}></div>
        </>
        :
        <div>
          <p className='text dashboard' id="no-file">{noFile}</p>
        </div>
      }
      </div>
      :
      <div className='cp'>
        <CircularProgress  style={{color: '#ffc107'}} />
      </div>
    }
    </div>
    
  );
}

export default withRouter(RenderMenu);
