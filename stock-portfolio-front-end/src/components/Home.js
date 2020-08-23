import React from "react"
import { Link } from "react-router-dom"
import "../styles/app.css"
import { Typography } from '@material-ui/core'

const Home = (props) => {
  return (
    <div class="center">
      <h1>Welcome to Stockfolio!</h1>
      <Typography>
        Here, you can create an account, buy stocks, and audit your
        transactions.
      </Typography>
      <p>To begin, <Link to="./Login">login</Link> or <Link to="./Register">sign up</Link> </p>
      <p></p>
    </div>
  )
}

export default Home
