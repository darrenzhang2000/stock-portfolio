import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/app.css"
import { Typography, makeStyles, Paper } from '@material-ui/core'
import { useDispatch } from "react-redux"
import {storePageName} from '../redux/actionCreators'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '20px',
    // paddingBottom: theme.spacing.unit * 15,
    textAlign: "left",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%'
  }
}))

const Home = (props) => {
  const dispatch = useDispatch()

  const classes = useStyles()

  useEffect(() => {
    dispatch(storePageName("Welcome to Stockfolio!"))
  }, [])

  return (
    <Paper className={classes.paper}>
        {/* <Typography variant="h4">Welcome to Stockfolio!</Typography> */}
        <Typography variant="h5" style={{padding: '20px 0px'}}>
          Here, you can create an account, buy stocks, and audit your
          transactions.
        </Typography>
        <Typography style={{padding: '20px 0'}}>To begin, <Link to="./Login">login</Link> or <Link to="./Register">sign up</Link> </Typography>
    </Paper>
  )
}

export default Home
