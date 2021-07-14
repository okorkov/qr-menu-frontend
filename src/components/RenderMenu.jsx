import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

const RenderMenu = (props) => {

  const [state, setState] = React.useState({isDataLoaded: false, menuLink: null, hasFile: false});
  const [loadedPDF, setLoadedPDF] = React.useState(false)

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

  const handleDocLoad = () => {
    document.getElementsByClassName('viewer-layout-toolbar')[0].remove()
    setLoadedPDF(true)
  }

  const handleSpinner = () => {
    if(document.getElementsByClassName('viewer-spinner')[0]){
      document.getElementsByClassName('viewer-spinner')[0].remove()
    }
  }
  
  return (
    <div>
    {
      state.isDataLoaded ?
      <div>
      {
        state.hasFile ?
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js" >
              <Viewer fileUrl={state.menuLink} className='menu-render' onDocumentLoad={handleDocLoad}/>
            </Worker>
        {
          <div>
            {
            loadedPDF ?
              null
            :
            <iframe onLoad={() => handleSpinner()} height={window.innerHeight} width={window.innerWidth} src={state.menuLink} className="render-iframe-menu" allowfullscreen/> 
          }
          </div>
        }
        </div>
        :
        <div>
          <p className='text dashboard'>Sorry, no file at this link</p>
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
