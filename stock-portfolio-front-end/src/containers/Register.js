import React from "react"
import Register from "../components/Register"
import axios from 'axios'
import { connect } from "react-redux";
import { storePageName, setSnackbarState } from '../redux/actionCreators'
import {addUser} from '../redux/userReducer'
import { Redirect } from "react-router-dom";

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class RegisterContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            balance: 5000,
            errors: ""
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

        //create user 
        let user = { ...this.state }

        //form validation 
        this.setState({ errors: [] }) //clears existing errors if any
        let errors = []

        //all fields non-empty
        if (!this.state.name || !this.state.email || !this.state.password) {
            errors.push({ msg: 'Please fill in all fields' })
        }

        //check if valid email
        if (!validateEmail(this.state.email)) {
            errors.push({ msg: "Please enter valid email address" })
        }

        //if no errors, add user to db by making an axios call to backend server 
        if (!errors.length) {
            axios.post('http://localhost:5000/users/register', { user })
                .then(res => {
                    let open = true
                    let message = "You have successfully registered the user!"
                    let variant = "success"

                    //check if email already exists in db
                    if (res.data == "Email already exists") {
                        errors.push({ msg: "Email already exists" })
                        //re-direct to same page with error and original data 
                        this.setState({ errors: errors })

                        message = errors.reduce((s, obj) => s += obj.msg + '. ', "")
                        variant = "error"
                        this.props.setSnackbarState(open, message, variant)
                    }
                    else {
                        //success message
                        this.props.setSnackbarState(open, message, variant)

                        //add user email to redux
                        this.props.addUser(this.state.email, this.state.balance)
                    }
                })


        }
        else {
            //if there are errors, re-direct to the same page with errors and original data
            let open = true
            let message = errors.reduce((s, obj) => s += obj.msg + '. ', "")
            console.log(message)
            let variant = "success"
            this.props.setSnackbarState(open, message, variant)
            this.setState({ errors: errors })
        }
    }

    componentDidMount() {
        this.props.storePageName('Register')
    }

    render() {
        if(this.props.isLoggedIn){
            return <Redirect to="/components/home"/>
        }

        return (
            <Register
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                balance={this.state.balance}
                errors={this.state.errors}
                changeNameHandler={this.changeNameHandler}
                changeEmailHandler={this.changeEmailHandler}
                changePasswordHandler={this.changePasswordHandler}
                onSubmitHandler={this.onSubmitHandler}
            />
        )
    }

}

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.email != ""
})

const mapDispatchToProps = {
    storePageName, setSnackbarState, addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
