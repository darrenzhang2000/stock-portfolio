import React from "react"
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/containers/Login">Login</Link>
          </li>
          <li>
            <Link to="/containers/Register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar