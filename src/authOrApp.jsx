import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRouter from './privateRouter'
import App from './App'
import LoginForm from './components/main/login'

const AuthOrApp = () =>(
    <Switch>
        <Route path="/login" component={LoginForm}/>
        <PrivateRouter path="/" component={App}/>
    </Switch>
)


export default AuthOrApp
