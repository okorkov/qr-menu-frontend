// import React, { useEffect } from 'react';
// import { withRouter } from "react-router";
// import { connect } from 'react-redux';
// import axios from 'axios';
// import FileUpload from './FileUpload';
// import CircularProgress from '@material-ui/core/CircularProgress';




// const Dashboard = (props) => {

//   const [lastMenu, setLastMenu] = React.useState({hasMenu: false, pdfMenu: null, qrCode: null});
//   const [menus, setMenus] = React.useState({menus: []});
//   const [isDataLoaded, setIsDataLoaded] = React.useState(false);
//   const [showResendButton, setShowResendButton] = React.useState(true)

//   const checkLoginStatus = (props) => {
//     if (!JSON.parse(localStorage.getItem('token'))) {
//       props.history.push('/')
//     }
//   }

//   const handleData = (data) => {
//     if(data.last_menu){
//       setLastMenu({
//         hasMenu: data.last_menu.has_menu,
//         pdfMenu: data.last_menu.pdf_file,
//         qrCode: data.last_menu.qr_code
//       })
//       setIsDataLoaded(true)
//     }
//   }

//   const handleResend = (e) => {
//     e.preventDefault();
//     axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/resend_qr_code`, {token: JSON.parse(localStorage.getItem('token'))})
//     .catch(err => alert(err.message))
//     setShowResendButton(false)
//     const timeId = setTimeout(() => {
//       setShowResendButton(true)
//     }, 5000)

//     return () => {
//       clearTimeout(timeId)
//     }
//   }

//   const checkPath = () => {
//     if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
//       document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
//     } else {
//       document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
//     }
//   }

//   useEffect(() => {
//     checkPath()
//     checkLoginStatus(props)
//     axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/find_menus`, {token: JSON.parse(localStorage.getItem('token'))})
//     .then((response) => handleData(response.data))
//     .catch(err => alert(err.message))
//   }, []);

//   return (
//     <div className='dashboard'>
//       {
//         isDataLoaded ?
//           !lastMenu.hasMenu ?
//           <p className='text'>There is no file uploaded</p>
//           :
//           <>
//           <div className='menu'>
//             <div style={{margin: '2%'}}>
//               <p className='text'>QR Code:</p>
//               <img className='qrcode' src={lastMenu.qrCode}></img>
//               <br/> <br />
//               <a href={lastMenu.qrCode} target="_blank">Link to QR Code</a>
//               <br />
//               <button 
//               id='resend-qr'
//               className='btn btn-success'
//               style={{marginTop: '15%'}}
//               onClick={(e) => handleResend(e)}
//               disabled={!showResendButton}>
//               Re-send this QR Code to my email
//               </button>
//             </div>
//             <div style={{margin: '2%'}}>
//               <p className='text'>File:</p>
//               <iframe className='pdf' src={lastMenu.pdfMenu} ></iframe>
//             </div>
//           </div>
//             <p className='text' style={{paddingTop: '3%'}}>Upload new File</p>
//           </>
//         :
//         <>
//         <CircularProgress style={{color: '#ffc107'}}/>
//         <p className='text' style={{paddingTop: '3%'}}>Loading, please wait.</p>
//         </>
//       }
//       <FileUpload setLastMenu={setLastMenu}/>
//     </div>
//   );
// }

// const mapStateToProps = function(state) {
//   return state
// }

// export default connect(mapStateToProps)(withRouter( Dashboard));


import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import FileUpload from './FileUpload';
import CropFreeIcon from '@material-ui/icons/CropFree';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

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
        qrCode: data.last_menu.qr_code,
        uploaded: data.last_menu.uploaded
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

  useEffect(() => {
    checkPath()
    checkLoginStatus(props)
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/find_menus`, {token: JSON.parse(localStorage.getItem('token'))})
    .then((response) => handleData(response.data))
    .catch(err => alert(err.message))
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDate = (dateFromDB) => {
    if (dateFromDB){
      let getDate = dateFromDB.split('T');
      let fullDate = getDate[0].split('-')
      return `${fullDate[1]}/${fullDate[2]}/${fullDate[0]}`;
    } else {
      return 'unknown'
    }
  }

  return (
    <>
    <div className='dashboard'>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <CropFreeIcon />
          </Avatar>
        }
        title="Your most recent QR generated on:"
        subheader={handleDate(lastMenu.uploaded)}
      />
      <a href={lastMenu.qrCode} target="_blank"><CardMedia
        className={classes.media}
        image={lastMenu.qrCode}
        title="QR Code"
      />
      </a>
      <CardContent>
      <button 
        id='resend-qr'
        className='btn btn-success'
        style={{marginTop: '15%'}}
        onClick={(e) => handleResend(e)}
        disabled={!showResendButton}>
        Re-send this QR Code to my email
      </button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <iframe className='pdf' src={lastMenu.pdfMenu} ></iframe>
          <br />
          <a href={lastMenu.pdfMenu} target="_blank">Open file in new window</a>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    <div style={{justifyContent: 'center', textAlign: 'center', paddingTop: '3%'}}>
    <FileUpload setLastMenu={setLastMenu}/>
    </div>
    </>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Dashboard));