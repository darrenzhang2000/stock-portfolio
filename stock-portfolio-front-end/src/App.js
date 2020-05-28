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

//store
import { createStore } from "redux"
// import userReducer from './redux/userReducer'
// import addUser from './redux/userReducer'

const ADD_USER = "ADD_USER"
const REMOVE_USER = "REMOVE_USER"

function addUser(user) {
  return {
    type: ADD_USER,
    user,
  }
}

function removeUser() {
  return {
    type: REMOVE_USER,
  }
}

const initialState = {
  name: "",
  email: "",
  //balance: 5000,
  //transactions: [],
  //portfolio: []
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        name: action.user.name,
        email: action.user.email,
      })

    case REMOVE_USER:
      return Object.assign({}, state, {
        name: "",
        email: "",
      })
    // if the action is not recognized, don't do anything
    default:
      return state
  }
}

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
store.dispatch(addUser({ name: "daren", email: "darrenzhang200027@gmail.com" }))
store.dispatch(addUser({ name: "daren", email: "darrenzhang200027@gmail.com" }))
store.dispatch(addUser({ name: "daren", email: "darrenzhang200027@gmail.com" }))
store.dispatch(removeUser())
console.log(store.getState())

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? children : <Redirect to="/containers/login" />
      }
    />
  )
}

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
    console.log(store)
    console.log("app user state", this.state.user)
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
            <ProtectedRoute path="/containers/Transactions">
              <TransactionsContainer className="top" email={this.state.user} />
            </ProtectedRoute>

            <Route path="/containers/Portfolio">
              <PortfolioContainer className="top" user={this.state.user} />
              <PurchaseContainer getUser={this.getUser} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
