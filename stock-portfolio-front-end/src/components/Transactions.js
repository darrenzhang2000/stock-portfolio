import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import "../App.css"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    padding: theme.spacing.unit * 6, 
    paddingBottom: theme.spacing.unit * 15,
    textAlign: "left",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%'
  },
}))

const Transactions = (props) => {
  const classes = useStyles()

  if (props.email) {
    return (
      <Paper className={classes.paper}>
      <div class="table">
        <Typography component="h1" variant="h5">
          Transactions History
        </Typography>
        <TableContainer component={Paper} className="tableContainer">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Buy / Sell</TableCell>
                <TableCell align="right">Stock Ticker Symbol</TableCell>
                <TableCell align="right">Quantity Purchased/Sold</TableCell>
                <TableCell align="right">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.transactionHistory.length > 0 ? (
                props.transactionHistory.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      Buy
                    </TableCell>
                    <TableCell align="right">
                      {transaction.tickerSymb.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">{transaction.qty}</TableCell>
                    <TableCell align="right">{transaction.cost}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell component="th" scope="row">
                  User does not have any transactions
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </Paper>
    )
  } else {
    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please <Link to="../containers/Login">log in</Link> to view your transaction history.
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

export default connect(mapStateToProps)(Transactions)
