import React from "react"
import axios from "axios"
import Portfolio from "../components/Portfolio"

class PortfolioContainer extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Portfolio/>
      </div>
    )
  }
}

export default PortfolioContainer
