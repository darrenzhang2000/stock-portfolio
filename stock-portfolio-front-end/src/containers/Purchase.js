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
  }

  onQtyChange = (e) => {
    this.setState({ qty: parseInt(e.target.value) })
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
      url = `https://cloud.iexapis.com/stable/stock/${this.state.ticker}/quote?token=pk_14ce505b6dd1448cad3d754e27cb2ebd`
      axios
        .get(url)
        .then((res) => {
          //retrieve object containing stockprices with key=time
          const stockPrices = res.data
          
          //if ticker symbol is invalid
          if (!stockPrices) {
            alert("Please enter valid ticker symbol")
            return {
              error: true,
              message: "invalid ticker symbol",
            }
          } else {
            //retrieve the most recent stock price
            return stockPrices['latestPrice']
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
