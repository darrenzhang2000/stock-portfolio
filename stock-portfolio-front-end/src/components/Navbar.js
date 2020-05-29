import React from "react"
import { Link } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import "../styles/navbar.css"
import { removeUserDispatch } from "../redux/reduxStore"
import { connect } from "react-redux"

class Navbar extends React.Component {
  constructor() {
    super()
  }

  logoutHandler = () => {
    removeUserDispatch()
  }

  redirectToSignIn = () => {}

  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Stock Portfolio</Typography>

          {!this.props.email ? (
            <Button color="inherit">
              <Link className="navlink" to="/containers/Login">
                Login
              </Link>
            </Button>
          ) : (
            <Button color="inherit" onClick={this.logoutHandler}>
              Logout
            </Button>
          )}

          {!this.props.email ? (
            <Button color="inherit">
              <Link className="navlink" to="/containers/Register">
                Register
              </Link>
            </Button>
          ) : null}

          <Button color="inherit">
            <Link
              className="navlink"
              to="/containers/Transactions"
              onClick={this.redirectToSignIn}
            >
              Transactions
            </Link>
          </Button>

          <Button color="inherit" onClick={this.redirectToSignIn}>
            <Link
              className="navlink"
              to="/containers/Portfolio"
              onClick={this.redirectToSignIn}
            >
              Portfolio
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
  }
}

export default connect(mapStateToProps)(Navbar)
