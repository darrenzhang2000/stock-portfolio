import React from "react"
import Login from "../components/Login"

class LoginContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    changeEmailHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    changePasswordHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        console.log("form submitted")
    }

    render() {
        return <Login 
        changeEmailHandler={this.changeEmailHandler}
        changePasswordHandler={this.changePasswordHandler}
        onSubmitHandler={this.onSubmitHandler} />
    }
}

export default LoginContainer
