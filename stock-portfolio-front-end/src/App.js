import React from "react"
import "./App.css"
import LoginContainer from "./containers/Login"
import RegisterContainer from "./containers/Register"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import PortfolioContainer from "./containers/Portfolio"
import PurchaseContainer from "./containers/Purchase"
import TransactionsContainer from "./containers/Transactions"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      user: ""
    }
  }
  setUser = (email) => {
    this.setState({user: email})
  }

  getUser = () => {
    return this.state.user
  }

  render() {
    console.log('app user state', this.state.user)
    return (
      <div className="App">
        <Router>
          <TransactionsContainer email={this.state.user}/>

          <PortfolioContainer user={this.state.user}/>
          <PurchaseContainer getUser={this.getUser}/>

          {/* containers all the links */}
          <Navbar />

          {/* Looks through the child <Routes>s and returns the first one that matches the URL */}
          <Switch>
            <Route path="/containers/Login">
              <LoginContainer setUser={this.setUser}/>
            </Route>
            <Route path="/containers/Register">
              <RegisterContainer />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
