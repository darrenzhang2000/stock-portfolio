import React from "react"

const Portfolio = (props) => {
  return (
    <div>
      <div name="stocklist">
        <h1>Portfolio</h1>
        <ul>
          {props.stocks.length > 0 ? props.stocks.map((stock, index) => <li key={index}>{stock.tickerSymb} : {stock.qty}</li>): null}
        </ul>
      </div>

      <ul>
        {props.errors ? props.errors.map((err) => <li>{err.msg}</li>) : null}
      </ul>
    </div>
  )
}

export default Portfolio
