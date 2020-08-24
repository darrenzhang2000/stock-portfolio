import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.userReducer.email)
    console.log('isloggedin', isLoggedIn != "")
    return (
        <Route {...rest}
            render={props => isLoggedIn != "" ?
                (<Component {...props} />)
                : (
                    <Redirect to="/containers/login"/>
                )}
        />)
}

export default PrivateRoute

