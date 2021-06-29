import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ErrorPage from './components/ErrorPage'
import Dashboard from './components/Dashboard'


function App() {

  const BASE_URL = process.env.BASE_URL

  return (
    <Router>
      <Switch>
        <Route path={'/dashboard'} exact component={Dashboard} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
