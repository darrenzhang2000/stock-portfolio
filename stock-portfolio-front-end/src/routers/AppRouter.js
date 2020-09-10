import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../components/Home'
import MiniDrawer from '../components/MiniDrawer'
import LoginContainer from '../containers/Login'
import PortfolioContainer from '../containers/Portfolio'
import PurchaseContainer from '../containers/Purchase'
import RegisterContainer from '../containers/Register'
import TransactionsContainer from '../containers/Transactions'
import PrivateRoute from './components/PrivateRoute'


const AppRoute = (props) => {
    const { email } = useSelector(state => state.userReducer)
    const { getUser, setUser, user } = props
    return (
        <MiniDrawer>
            <Switch>
                <Route path="/components/Home">
                    <Home className="top" />
                </Route>

                <Route path="/containers/Login">
                    <LoginContainer className="top" setUser={setUser} />
                </Route>

                <Route path="/containers/Register">
                    <RegisterContainer className="top" />
                </Route>

                <PrivateRoute path="/containers/Transactions">
                    <TransactionsContainer className="top" email={email} />
                </PrivateRoute>

                <PrivateRoute path="/containers/Portfolio">
                    <PortfolioContainer className="top" user={user} />
                </PrivateRoute>

                <PrivateRoute path="/containers/Purchase" component={PurchaseContainer} />
                {/* <PurchaseContainer getUser={getUser} />
                </PrivateRoute> */}

                <Route path="/">
                    <Home className="top" />
                </Route>
            </Switch>
            {/* </Layout> */}
        </MiniDrawer>
    )
}

export default AppRoute