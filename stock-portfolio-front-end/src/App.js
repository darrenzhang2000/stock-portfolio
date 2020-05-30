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
import PortfolioContainer from "./containers/Portfolio"
import PurchaseContainer from "./containers/Purchase"
import TransactionsContainer from "./containers/Transactions"
import "./styles/app.css"
import { connect } from "react-redux"

//store
// import store from "./redux/reduxStore"
// import { addUser, removeUser } from "./redux/userReducer"

// store.dispatch(addUser({ name: "daren", email: "darrenzhang200027@gmail.com" }))
// store.dispatch(addUser({ name: "daren", email: "darrenzhang200027@gmail.com" }))
// store.dispatch(addUser({ name: "daren", email: "darrenzhang200027@gmail.com" }))
// store.dispatch(removeUser())
// console.log(store.getState())

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
            <Route path="/containers/Login">
              <LoginContainer className="top" setUser={this.setUser} />
            </Route>

            <Route path="/containers/Register">
              <RegisterContainer className="top" />
            </Route>

            {/* <Route path="/containers/Transactions">
              <TransactionsContainer className="top" email={this.state.user} />
            </Route> */}
            <Route path="/containers/Transactions">
              {this.props.email ? (
                <TransactionsContainer
                  className="top"
                  email={this.state.user}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/containers/Login",
                    // state: {msg: "Please sign in to view your transactions"},
                  }}
                />
              )}
            </Route>

            <Route path="/containers/Portfolio">
              {this.props.email ? (
                <div>
                  <PortfolioContainer className="top" user={this.state.user} />
                </div>
              ) : (
                <Redirect
                  to={{
                    pathname: "/containers/Login",
                    // state: {msg: "Please sign in to view your transactions"},
                  }}
                />
              )}
            </Route>

            <Route path="/containers/Purchase">
              {this.props.email ? (
                <div>
                  <PurchaseContainer getUser={this.getUser} />
                </div>
              ) : (
                <Redirect
                  to={{
                    pathname: "/containers/Login",
                    // state: {msg: "Please sign in to view your transactions"},
                  }}
                />
              )}
            </Route>

          </Switch>
        </Router>
      </div>
    )
  }
}

// function ProtectedRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         this.props.email ? children : <Redirect to="/containers/login" />
//       }
//     />
//   )
// }

function mapStateToProps(state) {
  return {
    email: state.email,
  }
}

export default connect(mapStateToProps)(App)
