import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#09c5f9d5',
  },
  tabs: {
    fontWeight: 'bold',
  }
});

const SubNavbar = (props) => {

  const classes = useStyles();

  const lang = props.menus.lang
  const text = {
    en: {
      tab1: 'Dashboard',
      tab2: 'Single File',
      tab3: 'Manage QR Menu',
      tab4: 'QR for a Link'
    },
    ru: {
      tab1: 'Быстрый Доступ',
      tab2: 'Одиночные Файлы',
      tab3: 'QR Меню Панель',
      tab4: 'QR на ссылку',
    }
  }
  
  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab className={classes.tabs} label={<div style={{color: 'white', textShadow: '1px 1px black'}}>{text[lang].tab1}</div>} component={Link} to={'/dashboard'}/>
          <Tab className={classes.tabs} label={<div style={{color: 'white', textShadow: '1px 1px black'}}>{text[lang].tab2}</div>} component={Link} to={'/single-file'}/>
          <Tab className={classes.tabs} label={<div style={{color: 'white', textShadow: '1px 1px black'}}>{text[lang].tab3}</div>} component={Link} to={'/qr-menu'}/>
          <Tab className={classes.tabs} label={<div style={{color: 'white', textShadow: '1px 1px black'}}>{text[lang].tab4}</div>} component={Link} to={'/qr-link'}/>
        </Tabs>
      </Paper>
    </>
  );
}



const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(SubNavbar));