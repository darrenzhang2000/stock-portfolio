import React from "react"
import { Link } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import "../styles/navbar.css"
import { removeUserDispatch } from "../redux/reduxStore"
import { connect } from "react-redux"
import { IconButton } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import {removeUser} from '../redux/userReducer'

class Navbar extends React.Component {
  constructor() {
    super()
  }

  logoutHandler = () => {
    // removeUserDispatch()
    console.log('logout handler')
    this.props.removeUser()
  }

  render() {
    const { classes, open, handleDrawerOpen } = this.props
    console.log('open', open)

    return (
      <AppBar position="absolute"
      className={classNames(classes.AppBar, open && classes.appBarShift)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
            style={{display: 'none'}}
          >
            <MenuIcon/>
          </IconButton>

          <Grid container justify="space-between" alighContent="flex-end">
            <Grid item xm={12}>
              <Typography variant="h6">
                <Link className="navlink" to="../components/Home">
                  {" "}
                  Stock Portfolio
                </Link>
              </Typography>
            </Grid>

            {/* <Grid item>
              <Button color="inherit">
                <Link className="navlink" to="/containers/Transactions">
                  Transactions
                </Link>
              </Button>
            </Grid>

            <Grid item xm={2}>
              <Button color="inherit">
                <Link className="navlink" to="/containers/Portfolio">
                  Portfolio
                </Link>
              </Button>
            </Grid>

            <Grid item>
              <Button color="inherit">
                <Link className="navlink" to="/containers/Purchase">
                  Purchase
                </Link>
              </Button>
            </Grid> */}

            <Grid item xm={1}>
              {!this.props.email ? (
                <Button color="inherit">
                  <Link className="navlink" to="/containers/Login">
                    Login
                  </Link>
                </Button>
              ) : (
                <Button color="inherit" onClick={() => {this.logoutHandler(); console.log('hi')}}>
                  Logout
                </Button>
              )}
            </Grid>

            <Grid item xm={1}>
              {!this.props.email ? (
                <Button color="inherit">
                  <Link className="navlink" to="/containers/Register">
                    Register
                  </Link>
                </Button>
              ) : null}
            </Grid>
          </Grid>
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

const mapDispatchToProps = {
  removeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
