import React from "react"
import Register from "../components/Register"

class RegisterContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            balance: "",
        }
    }

    changeNameHandler = (e) => {
        this.setState({
            name: e.target.value,
        })
        console.log(this.state.name)
    }

    changeEmailHandler = (e) => {
        this.setState({
            email: e.target.value,
        })
        console.log(this.state.email)
    }

    changePasswordHandler = (e) => {
        this.setState({
            password: e.target.value,
        })
        console.log(this.state.password)
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        console.log('submitted', this.state)
    }

    render() {
        return (
            <Register
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                balance={this.state.balance}
                changeNameHandler={this.changeNameHandler}
                changeEmailHandler={this.changeEmailHandler}
                changePasswordHandler={this.changePasswordHandler}
                onSubmitHandler={this.onSubmitHandler}
            />
        )
    }
}

export default RegisterContainer
