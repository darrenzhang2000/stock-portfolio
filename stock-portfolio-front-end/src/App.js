import React, { Children } from "react"
import "./App.css"
import LoginContainer from "./containers/Login"
import RegisterContainer from "./containers/Register"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import PortfolioContainer from "./containers/Portfolio"
import PurchaseContainer from "./containers/Purchase"
import TransactionsContainer from "./containers/Transactions"
import "./styles/app.css"
import { connect } from "react-redux"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: "",
    }
  }
  setUser = (email) => {
    this.setState({ user: email })
  }

  getUser = () => {
    return this.state.user
  }

  render() {
    return (
      <div className="App">
        <Router>
          {/* containers all the links */}
          <Navbar className="navbar" />

          {/* Looks through the child <Routes>s and returns the first one that matches the URL */}
          <Switch>
            <Route path="/components/Home">
              <Home className="top" />
            </Route>

            <Route path="/containers/Login">
              <LoginContainer className="top" setUser={this.setUser} />
            </Route>

            <Route path="/containers/Register">
              <RegisterContainer className="top" />
            </Route>

            <Route path="/containers/Transactions">
              <TransactionsContainer className="top" email={this.props.email} />
            </Route>

            <Route path="/containers/Portfolio">
              <PortfolioContainer className="top" user={this.state.user} />
            </Route>

            <Route path="/containers/Purchase">
              <PurchaseContainer getUser={this.getUser} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
  }
}

export default connect(mapStateToProps)(App)
