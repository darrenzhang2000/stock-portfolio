import React from "react"

const Transactions = (props) => {
  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {props.transactionHistory.map((transaction, index) => (
          <li key={index}>
            Buy ({transaction.tickerSymb.toUpperCase()}) - {transaction.qty} Shares @ ${transaction.cost}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transactions
