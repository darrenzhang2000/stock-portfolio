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

const Portfolio = (props) => {
  const classes = useStyles()

  return (
    <div>
      <TableContainer component={Paper} className="tableContainer">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stock Ticker Symbol</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.stocks.length > 0 ? (
              props.stocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {stock.tickerSymb}
                  </TableCell>
                  <TableCell align="right">{stock.qty}</TableCell>
                  <TableCell align="right">{0}</TableCell>
                </TableRow>
              ))
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
}

export default Portfolio
