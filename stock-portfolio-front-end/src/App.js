import React from 'react';
import './App.css';
import LoginContainer from './containers/Login'
import RegisterContainer from './containers/Register'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/containers/Login">Login</Link>
              </li>
              <li>
                <Link to="/containers/Register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Looks through the child <Routes>s and returns the first one that matches the URL */}
        <Switch>
          <Route path="/containers/Login">
            <LoginContainer/>
          </Route>
          <Route path="/containers/Register">
            <RegisterContainer/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;