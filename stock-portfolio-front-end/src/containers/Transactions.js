import React from "react"
import axios from "axios"
import Transactions from "../components/Transactions"
import { connect } from 'react-redux'

class TransactionsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
        transactionHistory: []
    }
  }

  getTransactionHistory = () => {
    axios
      .get(`http://localhost:5000/transactions/email/${this.props.email}`)
      .then((res) => {
        var transactionHistory = Array.from(res.data.transactionHistory)

        //sort transaction history with most recent at the front of the array
        transactionHistory.sort((t1, t2) => {
          return t1.time < t2.time
        })
        this.setState({transactionHistory : transactionHistory})
      })
  }

  render() {
    if (this.props.email && this.state.transactionHistory == 0) {
      this.getTransactionHistory()
    }
    return <Transactions transactionHistory={this.state.transactionHistory}/>
  }
}

export default TransactionsContainer