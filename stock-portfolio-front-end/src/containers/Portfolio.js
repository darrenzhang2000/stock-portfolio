import React from "react"
import axios from "axios"
import Portfolio from "../components/Portfolio"

class PortfolioContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      stocks: []
    }
  }

  updateStocks = () => {
    const url = `http://localhost:5000/stocks/email/${this.props.user}/stock`
    axios.get(url).then((res) => {
      this.setState({ stocks: res.data })
      console.log(this.state.stocks)
    })
  }
  render() {
    console.log('s', this.state.stocks, this.props.user)
    if(this.props.user && this.state.stocks.length == 0){
      console.log('here')
      this.updateStocks()
    }
    return (
      <div>
        <Portfolio stocks={this.state.stocks}/>
      </div>
    )
  }
}

export default PortfolioContainer
