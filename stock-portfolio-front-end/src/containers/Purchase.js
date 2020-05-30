import React from "react"
import Purchase from "../components/Purchase"
import axios from "axios"

class PurchaseContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      ticker: "",
      qty: 0,
    }
  }
  onTickerChange = (e) => {
    this.setState({ ticker: e.target.value })
    console.log(this.state.ticker)
  }

  onQtyChange = (e) => {
    this.setState({ qty: parseInt(e.target.value) })
    console.log(this.state.qty)
  }

  onSubmitHandler = (e) => {
    e.preventDefault()

    //makes sure form fields are non-empty
    let errors = []
    let url = ""

    if (!this.state.ticker || !this.state.qty) {
      errors.push({ msg: "Please fill in all fields" })
    }

    if (!Number.isInteger(this.state.qty)) {
      errors.push({ msg: "Quantity has to be an integer" })
    }

    //if there are errors, rerender form with flash message containing error
    if (errors.length) {
      this.setState({ errors: errors })
    } else {
      //call to alpha vantage api using ticker and stock count
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=1min&apikey=GYGD5L3VUM8VS4V9`
      axios
        .get(url)
        .then((res) => {
          //retrieve object containing stockprices with key=time
          const stockPrices = res.data["Time Series (1min)"]
        

          //if ticker symbol is invalid
          if (!stockPrices) {
            alert("Please enter valid ticker symbol")
            return {
              error: true,
              message: "invalid ticker symbol",
            }
          } else {
            //retrieve the most recent stock price
            const stockPricesKeys = Object.keys(stockPrices)
            const mostRecentTimeSeries = stockPricesKeys[0]
            const mostRecentStockPrice =
              stockPrices[mostRecentTimeSeries]["4. close"]
            return mostRecentStockPrice
          }
        })
        .then(async (price) => {
          if (price.error) {
            return
          }

          //calculate total cost
          let cost = this.state.qty * price

          //round cost to 2 decimal places
          cost = cost.toFixed(2)
          cost = parseFloat(cost)
          console.log(
            `Cost of ${this.state.qty} share of ${this.state.ticker} is ${cost}`
          )

          //retrieve user from App component
          const userEmail = this.props.getUser()

          //retrieve user balance from database
          let res = await axios.get(
            `http://localhost:5000/users/email/${userEmail}/balance`,
            (err) => {
              if (err) {
                console.log(err)
              }
            }
          )
          let balance = res.data.balance
          let newBalance = balance - cost
          //round newBalance to two decimal places
          newBalance = newBalance.toFixed(2)
          newBalance = parseFloat(newBalance)

          //if user has enough money, purchase is valid.
          if (newBalance >= 0) {
            //deduct cost from balance in db
            axios.post(
              `http://localhost:5000/users/email/${userEmail}/balance/${newBalance}`,
              (err) => {
                if (err) {
                  console.log(err)
                }
              }
            )

            //add stock to user's account
            axios.post(
              `http://localhost:5000/stocks/email/${userEmail}/stock/${this.state.ticker}/qty/${this.state.qty}`,
              {
                url: url
              },
              (err) => {
                if (err) {
                  console.log(err)
                }
              }
            )

            //record transaction
            axios.post(
              `http://localhost:5000/transactions/email/${userEmail}/stock/${this.state.ticker}/qty/${this.state.qty}/cost/${cost}`,
              {
                url: url
              },
              (err) => {
                if (err) {
                  console.log(err)
                }
              }
            )

            alert(
              `You have successfully purchase ${this.state.qty} shares of ${this.state.ticker} for a total of \$${cost}. Your new balance is \$${newBalance}.`
            )
          } else {
            //User does not have enough money
            alert("You don't have enough money.")
          }
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
