import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Link } from "react-router-dom"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import "../App.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const Portfolio = (props) => {
  const classes = useStyles()

  if (props.email) {
    return (
      <div class="table">
        <Typography component="h1" variant="h5">
          Portfolio
        </Typography>
        <TableContainer component={Paper} className="tableContainer">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Stock Ticker Symbol</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Value</TableCell>
                <TableCell align="right">Opening Price</TableCell>
                <TableCell align="right">Current Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.stocks.length > 0 ? (
                props.stocks.map((stock, index) => {
                  let color
                  if (stock.currentPrice < stock.openingPrice) {
                    color = "red"
                  } else if (stock.currentPrice == stock.openingPrice) {
                    color = "gray"
                  } else {
                    color = "green"
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ color: color }}
                      >
                        {stock.tickerSymb}
                      </TableCell>
                      <TableCell align="right">{stock.qty}</TableCell>
                      <TableCell align="right">
                        {Math.round(stock.currentPrice * 100 * stock.qty) / 100}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(stock.openingPrice * 100) / 100}
                      </TableCell>
                      <TableCell align="right" style={{ color: color }}>
                        {Math.round(stock.currentPrice * 100) / 100}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableCell component="th" scope="row">
                  User does not have any stocks
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  } else {
    return (
      <div>
        <Typography component="h1" variant="h5">
          Portfolio
        </Typography>
        <p>
          Please <Link to="../containers/Login">log in</Link> to view your
          portfolio.
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
  }
}

export default connect(mapStateToProps)(Portfolio)
