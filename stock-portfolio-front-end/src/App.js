import React from 'react';
import './App.css';
import LoginContainer from './containers/Login'
import RegisterContainer from './containers/Register'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import PortfolioContainer from './containers/Portfolio'
import PurchaseContainer from './containers/Purchase';

function App() {
  return (
    <div className="App">
      <Router>  

        <PortfolioContainer/>
        <PurchaseContainer/>

        {/* containers all the links */}
        <Navbar/> 

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