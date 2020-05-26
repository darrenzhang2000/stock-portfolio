import React from "react"
import { Link } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import "../styles/navbar.css"

const Navbar = (props) => {
  return (
      <AppBar position="sticky">

        <Toolbar>
          <Typography variant="h6">Stock Portfolio</Typography>

          <Button color="inherit">
            <Link className="navlink" to="/containers/Login">Login</Link>
          </Button>

          <Button color="inherit">
            <Link className="navlink" to="/containers/Register">Register</Link>
          </Button>

          <Button color="inherit">
            <Link className="navlink" to="/containers/Transactions">Transactions</Link>
          </Button>

          <Button color="inherit">
            <Link className="navlink"to="/containers/Portfolio">Portfolio</Link>
          </Button>

        </Toolbar>
      </AppBar>
  )
}

export default Navbar
