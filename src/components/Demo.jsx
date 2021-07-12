import React, { useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
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
import CropFreeIcon from '@material-ui/icons/CropFree';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'none',
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


const Demo = (props) => {

  const classes = useStyles();

  const [demo, setDemo] = React.useState({dataLoaded: false, data: {}});
  const [expanded, setExpanded] = React.useState(false);

  const checkPath = () => {
    if(window.location.pathname === '/' && document.getElementsByClassName('footer')[0]) {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start fixed-bottom';
    } else {
      document.getElementsByClassName('footer')[0].className = 'footer text-lg-start';
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  useEffect(() => {
    checkPath()
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/demo`)
    .then(response => setDemo({dataLoaded: true, data: response.data}))
    .catch(error => alert(error.message))
  }, []);

  const handleDemoUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/demo_upload`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => setDemo({...demo, data: response}))
    .then(response => $('#loader').hide(0))
    .catch(err => alert(err.message))
  }

  const [file, setFile] = React.useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  }

  const loader = () => {
    $('#loader').show(0)
  }

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
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      {
        demo ?
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
        subheader={handleDate(demo.data.uploaded)}
      />
      <a href={demo.data.qr_code} target="_blank"><CardMedia
        className={classes.media}
        image={demo.data.qr_code}
        title="QR Code"
      />
      </a>
      <CardContent>
      <button 
        id='resend-qr'
        className='btn btn-success'
        style={{marginTop: '15%'}}
        disabled>
        Re-send this QR Code to my email (Disabled in Demo mode)
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
          <iframe className='pdf' src={demo.data.pdf_file} ></iframe>
          <br />
          <a href={demo.data.pdf_file} target="_blank">Open file in new window</a>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    <div style={{justifyContent: 'center', textAlign: 'center', paddingTop: '3%'}}>
    <>
      <form onSubmit={(e) => handleDemoUpload(e)}>
        <input
        type="file" 
        className="btn btn-outline-warning" 
        style={{fontSize: '18px', color: 'white'}}
        accept=".doc, .pdf, image/png, image/jpeg, application/pdf" 
        required
        onChange={(e) => handleImageChange(e)}/>
        <br /> <br />
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={loader}
        type="submit"
      >
        Upload new file
      </Button>
      </form>
    </>
    </div>
    </>
        :
        <CircularProgress />
      }
    </div>
  );
}


export default Demo;

