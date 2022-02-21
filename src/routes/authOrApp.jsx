import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRouter from './privateRouter'
import Login from '../main/login/login'
import DashboardApp from './dashboardApp'

const AuthOrApp = () =>(
    <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRouter path="/" component={DashboardApp}/>
    </Switch>
)


export default AuthOrApp
