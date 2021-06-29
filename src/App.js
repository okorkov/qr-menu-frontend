import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import { connect} from 'react-redux';
import React, { useEffect } from 'react';
import axios from 'axios';



function App(props) {

  const checkLoginStatus = (props) => {
    // if(localStorage.getItem('token')){
    //   props.dispatch({
    //     type: "CHECK_LOGIN_STATUS",
    //     payload: JSON.parse(localStorage.getItem('token'))
    //   })
    // }
    axios.post(`http://127.0.0.1:3000/logged_in`, {token: JSON.parse(localStorage.getItem('token'))})
    .then(response => {
      props.dispatch({
            type: "CHECK_LOGIN_STATUS",
            payload: response
      })
    })
    .catch(err => alert(err.message))
  }

  useEffect(() => {
    checkLoginStatus(props)
  }, []);

  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/dashboard'} exact component={Dashboard} />
        <Route path={'/contact'} exact component={Contact} />
        <Route path={'/about'} exact component={About} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(App)