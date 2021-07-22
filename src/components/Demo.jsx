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
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '500px',
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'inline-block',
    marginBottom: '5%'
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

  const lang = props.menus.lang
  const text = {
    en: {
      header1: "This is a demo page, please don't use it for hosting your documents.",
      header2: "Only 'Single File Upload' available on demo page, for 'QR Menu' or 'QR Link' please sign up to proceed.",
      title: "Your most recent QR generated on:",
      resend: 'Re-send this QR Code to my email (Disabled in Demo mode)',
      openFile: 'Open file in new window',
      uploadFile: 'Upload new file',
    },
    ru: {
      header1: "Это демо страница, пожалуйста не используйте сгенерированные тут QR коды так как они буду удалены.",
      header2: "В демо режиме доступна только загрузка одиночных файлов. Для 'QR меню' или 'QR на ссылку' пожалуйста создайте аккаунт.",
      title: "Последний QR загружен:",
      resend: 'Отправить QR на имейл (недоступно в демо режиме)',
      openFile: 'открыть файл в новом окне',
      uploadFile: 'Загрузить файл',
    }
  }

  const classes = useStyles();

  const [demo, setDemo] = React.useState({dataLoaded: false, data: {}});
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/demo`)
    .then(response => setDemo({dataLoaded: true, data: response.data}))
    .catch(error => alert(error.message))
  }, []);

  const handleDemoUpload = (e) => {
    e.preventDefault();
    if (file.size > 5e+6) {
      alert("File is too big! Keep it under 5 MB");
      e.target.childNodes[0].value = ''
      $('#loader').hide(0)
      return null;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/demo_upload`, {
        method: 'POST',
        body: formData
      })
      .then(data => data.json())
      .then(response => setDemo({...demo, data: response}))
      .then(response => document.querySelector('input').value = '')
      .then(response => $('#loader').hide(0))
      .catch(err => alert(err.message))
    }
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

  const handleDateRu = (dateFromDB) => {
    if (dateFromDB){
      let getDate = dateFromDB.split('T');
      let fullDate = getDate[0].split('-')
      return `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
    } else {
      return 'unknown'
    }
  }

  return (
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      <p className='text-title' style={{paddingTop: '2.5%'}}>{text[lang].header1}</p>
      <p className='text' >{text[lang].header2}</p>
      {
        demo ?
        <>
    <div className='dashboard'>
      <Card className='qr-card'>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <CropFreeIcon />
            </Avatar>
          }
          title={text[lang].title}
          subheader={(lang === 'en') ? handleDate(demo.data.uploaded) : handleDateRu(demo.data.uploaded)}
        />
        <a href={demo.data.qr_code} target="_blank"><CardMedia
          className={classes.media}
          image={demo.dataLoaded ? demo.data.qr_code : 'https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif'}
          title="QR Code"
        />
        </a>
        <CardContent>
        <Button variant="contained" color="primary"
        id='resend-qr'
        style={{marginTop: '1%'}}
        disabled
        >{text[lang].resend}
        </ Button >
        </CardContent>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
          </IconButton>
        </Card>
        <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex', paddingBottom:'5%'}}>
          <div className="iphone-demo" style={{backgroundImage: `url('/phone_template.png')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '45rem', width: '23rem', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <iframe src={demo.data.pdf_file} className="img" style={{height: '67%', width: '87.9%', marginLeft: '3px'}}/>
          </div>
        </div>
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
        {text[lang].uploadFile}
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



const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Demo);

