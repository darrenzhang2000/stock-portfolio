import React from "react"
import Purchase from "../components/Purchase"
import axios from "axios"

class PurchaseContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      ticker: "",
      qty: "",
    }
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

    //makes sure form fields are non-empty
    let errors = []
    if (!this.state.ticker || !this.state.qty) {
      errors.push({ msg: "Please fill in all fields" })
    }

    //if there are errors, rerender form with flash message containing error
    if (errors.length) {
      this.setState({ errors: errors })
    } else {
      //call to alpha vantage api using ticker and stock count
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=1min&apikey=GYGD5L3VUM8VS4V9`
      axios
        .get(url)
        .then((res) => {
          //retrieve object containing stockprices with key=time
          const stockPrices = res.data["Time Series (1min)"]

          //NEED TO CONSIDER CASE IF INVALID TICKER

          //retrieve the most recent stock price
          const stockPricesKeys = Object.keys(stockPrices)
          const mostRecentTimeSeries = stockPricesKeys[0]
          const mostRecentStockPrice =
            stockPrices[mostRecentTimeSeries]["4. close"]
          return mostRecentStockPrice
        })
        .then((price) => {
          //calculate total cost
          let cost = this.state.qty * price
          console.log(cost)

          //if user has enough money, purchase is valid.
        //   axios.get(`http://localhost:5000/users/email/${email}/balance`)
          //deduct cost from balance in db
          //increase number of stocks in db, or store number of stocks if the user doesn't have this stock
        })
    }
  }

  render() {
    //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9
    return (
      <div>
        <Purchase
          onTickerChange={this.onTickerChange}
          onQtyChange={this.onQtyChange}
          onSubmitHandler={this.onSubmitHandler}
          errors={this.state.errors}
        />
      </div>
    )
  }
}


export default PurchaseContainer