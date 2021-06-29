import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";


function App() {

  const BASE_URL = process.env.BASE_URL

  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/dashboard'} component={Dashboard} />
        <Route path={'/contact'} component={Contact} />
        <Route path={'/about'} component={About} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
