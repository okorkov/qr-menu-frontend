import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { logOut } from '../actions/user';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },

}));

function Navbar(props) {
  const classes = useStyles();

  const handleLogOut = () => {
    props.dispatch(logOut())
    localStorage.clear();
    props.history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Tabs 
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Home" value='/' icon={<HomeIcon />} component={Link} to={props.menus.logged_in ? '/dashboard' : '/'} />
          <Tab label="About" icon={<InfoIcon />} component={Link} to={'/about'}  />
          {props.menus.logged_in ?
            null
            :
            <Tab label="Demo" icon={<PersonPinIcon />} component={Link} to={'/demo'} />
          }
          <Tab label="Contact" icon={<ContactMailIcon />} component={Link} to={'/contact'} />
          {
            props.menus.logged_in ?
            <Tab label='Log out' icon={<ExitToAppIcon />} onClick={handleLogOut} />
            :
            null
          } 
        </Tabs>
      </AppBar>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Navbar));