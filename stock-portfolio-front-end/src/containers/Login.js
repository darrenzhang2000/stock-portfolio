import React from "react"
import Login from "../components/Login"
import axios from 'axios'
import { addUserDispatch } from '../redux/reduxStore'
import { connect } from 'react-redux'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class LoginContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: []
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

        //form validation 
        this.setState({errors: []}) //clears existing errors if any
        let errors = []
        
        //all fields non-empty
        if(!this.state.email || !this.state.password){
            errors.push({ msg: 'Please fill in all fields' })
        }

        //check if valid email
        if(!validateEmail(this.state.email)){
            errors.push({ msg: "Please enter valid email address"})
        }

        //if no errors, check authentication by making an axios get request
        if(!errors.length){
            const url = `http://localhost:5000/users/login/email/${this.state.email}/password/${this.state.password}`
            axios.get(url)
                .then(res => {
                    //email not in db
                    if(res.data == "User does not exist"){
                        errors.push({msg: "Email does not exist"})
                        this.setState({ errors: errors })
                    }
                    //email in db but password is wrong
                    else if(res.data == "email exists but incorrect password"){
                        errors.push({msg: "wrong password"})
                        this.setState({ errors: errors })
                    }
                    //successful login: email and password match
                    else if(res.data == "Success: email and password match"){
                        //add user to redux store
                        addUserDispatch({ email: this.state.email, balance: 5000 })

                        alert("Login Successful!")
                        //pass user to login
                        this.props.setUser(this.state.email)
                        //redirect to home page
                    }
                })
        }
        else{
            this.setState({ errors: errors })
        }
    }

    render() {
        this.props.location ? console.log(this.props.location.state.msg) : console.log('nothing')

        return <Login 
        errors={this.state.errors}
        changeEmailHandler={this.changeEmailHandler}
        changePasswordHandler={this.changePasswordHandler}
        onSubmitHandler={this.onSubmitHandler} />
    }
}

const mapDispatchToProps = { addUserDispatch }

export default connect(null, mapDispatchToProps)(LoginContainer)
