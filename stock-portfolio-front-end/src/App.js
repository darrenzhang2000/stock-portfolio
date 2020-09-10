import React from "react"
import { connect } from "react-redux"
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import LoginContainer from "./containers/Login"
import PortfolioContainer from "./containers/Portfolio"
import PurchaseContainer from "./containers/Purchase"
import RegisterContainer from "./containers/Register"
import TransactionsContainer from "./containers/Transactions"
import Layout from './components/Layout'
import "./styles/app.css"
import { MuiThemeProvider, CssBaseline } from "@material-ui/core"
import theme from './utilities/CustomTheme'
import MiniDrawer from "./components/MiniDrawer"
import CustomizedSnackbar from "./utilities/CustomizedSnackbar"
import AppRoute from "./routers/AppRouter"
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: "",
    }
  }
  setUser = (email) => {
    this.setState({ user: email })
  };

  getUser = () => {
    return this.state.user
  };

  render() {
    return (
      <div className="App">
        <CustomizedSnackbar/>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>


          <Router>
            <AppRoute user={this.state.user} setUser={this.setUser} getUser={this.getUser}/>
          </Router>
        </MuiThemeProvider>
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
