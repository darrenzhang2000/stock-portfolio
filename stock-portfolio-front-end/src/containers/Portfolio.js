import React from "react"
import axios from "axios"
import Portfolio from "../components/Portfolio"

class PortfolioContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      ticker: "",
      qty: "",
    }
  }

  componentDidMount() {
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9"
      )
      .then((res) => {
        //retrieve object containing stockprices with key=time
        const stockPrices = res.data["Time Series (1min)"]

        //retrieve the most recent stock price
        const stockPricesKeys = Object.keys(stockPrices)
        const mostRecentTimeSeries = stockPricesKeys[0]
        const mostRecentStockPrice =
          stockPrices[mostRecentTimeSeries]["4. close"]
        console.log(mostRecentStockPrice)
      })
  }

  onTickerChange = (e) => {
    this.setState({ ticker: e.target.value })
    console.log(this.state.ticker)
  }

  onQtyChange = (e) => {
    this.setState({ qty: e.target.value })
    console.log(this.state.qty)
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    console.log("onsubmit")
  }

  render() {
    //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9
    return (
      <div>
        <Portfolio
          onTickerChange={this.onTickerChange}
          onQtyChange={this.onQtyChange}
          onSubmitHandler={this.onSubmitHandler}
        />
      </div>
    )
  }
}

export default PortfolioContainer
