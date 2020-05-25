import React from "react"

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9
const Portfolio = (props) => {
  return (
    <div>
      <div name="stocklist">
        <h1>Portfolio</h1>
        <ul>
          <li>AAPL - 6 Shares $2048</li>
          <li>STWO - 6 Shares $2048</li>
          <li>NFLX - 6 Shares $2048</li>
        </ul>
      </div>

      <ul>
        {props.errors ? props.errors.map((err) => <li>{err.msg}</li>) : null}
      </ul>
    </div>
  )
}

export default Portfolio