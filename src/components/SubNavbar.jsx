import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: 'grey',
  },
  tabs: {
    fontWeight: 'bold',
  }
});

const SubNavbar = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          // value={value}
          // onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab className={classes.tabs} label="Dashboard" component={Link} to={'/dashboard'}/>
          <Tab className={classes.tabs} label="Single File Upload" component={Link} to={'/single-file'}/>
          <Tab className={classes.tabs} label="Manage QR Menu" component={Link} to={'/qr-menu'}/>
        </Tabs>
      </Paper>
    </>
  );
}

export default SubNavbar;
