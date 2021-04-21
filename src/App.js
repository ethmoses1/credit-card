
// import './App.css';
import Home from './components/Home.js';
import User from './components/User.js';
// import { Switch, Route, Router } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/User">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
