import React from 'react'
import axios from 'axios'

class PortfolioContainer extends React.Component{
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount(){
        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9")
            .then(res => {

                //retrieve object containing stockprices with key=time
                const stockPrices = res.data['Time Series (1min)']
                
                //retrieve the most recent stock price
                const stockPricesKeys = Object.keys(stockPrices)
                const mostRecentTimeSeries = stockPricesKeys[0]
                const mostRecentStockPrice = stockPrices[mostRecentTimeSeries]['4. close']
                console.log(mostRecentStockPrice)
            })
    }

    render(){
        //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=GYGD5L3VUM8VS4V9
        return <div>

        </div>
    }
}

export default PortfolioContainer