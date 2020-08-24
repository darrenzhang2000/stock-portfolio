import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Paper } from "@material-ui/core"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="./">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

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
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Purchase = (props) => {
  const classes = useStyles()

  if (props.email) {
    return (
      <Paper className={classes.paper}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <form name="purchase" onSubmit={props.onSubmitHandler}>
            <Typography component="h1" variant="h5">
              Purchase stocks{" "}
            </Typography>
            <ul>
              {props.errors
                ? props.errors.map((err, index) => <li key={index}>{err.msg}</li>)
                : null}
            </ul>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ticker"
                label="ticker"
                name="ticker"
                autoComplete="ticker"
                autoFocus
                onChange={props.onTickerChange}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="qty"
                label="qty"
                type="qty"
                id="qty"
                autoComplete="qty"
                onChange={props.onQtyChange}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Purchase
          </Button>
          </form>
        </Container>
      </Paper>
    )
  }
  else {
    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
            Please <Link to="../containers/Login">log in</Link> to purchase stocks.
        </Typography>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
  }
}

export default connect(mapStateToProps)(Purchase)
