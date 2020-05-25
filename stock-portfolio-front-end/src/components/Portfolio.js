import React from "react"

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9
const Portfolio = (props) => {
  // console.log('stocks', props.stocks.length > 0 ? props.stocks[0].tickerSymb : null)
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
