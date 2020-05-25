import React from 'react'
import Transactions from '../components/Transactions'

class TransactionsContainer extends React.Component{
    constructor(){
        super()
        this.state = {}
    }
    
    render(){
        return <Transactions/>
    }
}

export default TransactionsContainer