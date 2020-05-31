import React from "react"
import { Link } from "react-router-dom"
import "../styles/app.css"

const Home = (props) => {
  return (
    <div class="center">
      <h1>Welcome to Stockfolio!</h1>
      <p>
        Here, you can create an account, buy stocks, and audit your
        transactions.{" "}
      </p>
      <p>To begin, <Link to="./Login">login</Link> or <Link to="./Register">sign up</Link> </p>
      <p></p>
    </div>
  )
}

export default Home
