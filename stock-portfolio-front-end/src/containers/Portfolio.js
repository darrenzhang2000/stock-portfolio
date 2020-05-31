import React from "react"
import axios from "axios"
import Portfolio from "../components/Portfolio"

class PortfolioContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      stocks: [],
    }
  }

  updateStocks = () => {
    const url = `http://localhost:5000/stocks/email/${this.props.user}/stock`
    axios.get(url).then(async (res) => {
      let stocks = res.data

      //Add openingPrice and currentPrice to each stock
      for(let i = 0; i < stocks.length; i++){
        await axios.get(stocks[i].url).then((res) => {
          if(res.status == 200){
            console.log('i', res.data)
            stocks[i]["openingPrice"] = res.data["open"]
            stocks[i]["currentPrice"] = res.data["latestPrice"]
          }
        })
      }

      this.setState({ stocks: stocks })
    })
  }
  render() {
    if (this.props.user && this.state.stocks.length == 0) {
      this.updateStocks()
    }
    return (
      <div>
        <Portfolio stocks={this.state.stocks} />
      </div>
    )
  }
}

export default PortfolioContainer
