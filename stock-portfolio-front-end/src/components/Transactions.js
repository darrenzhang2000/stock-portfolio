import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import "../App.css"


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const Transactions = (props) => {
  const classes = useStyles()


  return (
    <div class="table">
      <h1>Transactions</h1>

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
                  <TableCell align="right">{transaction.tickerSymb.toUpperCase()}</TableCell>
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
  )
}

export default Transactions
