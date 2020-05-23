import React from "react"
import Register from "../components/Register"
import axios from 'axios'

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
            balance: "",
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
        console.log('submitted', this.state)

        //create user 
        let user = { ...this.state }

        //form validation 
        this.setState({errors: []}) //clears existing errors if any
        let errors = []
        
        //all fields non-empty
        if(!this.state.name || !this.state.email || !this.state.password){
            errors.push({ msg: 'Please fill in all fields' })
        }

        //check if valid email
        if(!validateEmail(this.state.email)){
            errors.push({ msg: "Please enter valid email address"})
        }

        //check if email already exists in db
        
        console.log("pre", errors)
        //if no errors, add user to db by making an axios call to backend server 
        if(!errors.length){
        axios.post('http://localhost:5000/users/register', {user})
            .then(res => {
                console.log('res', res.data)
                if(res.data =="Email already exists"){
                    console.log("Email already exists")
                    errors.push({msg: "Email already exists"})
                    //re-direct to same page with error and original data 
                    this.setState({ errors: errors })
                }
                else{
                    //success
                    alert('You have successfully registered')
                    //redirect to home page
                }
            })
        }
        else{
            //if there are errors, re-direct to the same page with errors and original data
            this.setState({ errors: errors })
        }
    }

    render() {
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

export default RegisterContainer
