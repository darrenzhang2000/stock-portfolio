import React from "react"
import { Link } from "react-router-dom"
import "../styles/app.css"
import { Typography, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 15,
    textAlign: "left",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%'
  }
}))

const Home = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <div class="center">
        <h1>Welcome to Stockfolio!</h1>
        <Typography>
          Here, you can create an account, buy stocks, and audit your
          transactions.
      </Typography>
        <p>To begin, <Link to="./Login">login</Link> or <Link to="./Register">sign up</Link> </p>
        <p></p>
      </div>
    </Paper>
  )
}

export default Home
