import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { checkAuth, getToken } from './services/auth'

const PrivateRouter = ({component: Component, ...rest}) => {

    return(
        <Route 
            {...rest}
            render={(props) =>{
                if(checkAuth()){
                    return <Component {...props}/>
                }else{
                    return <Redirect 
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                    />
                }
            }}
        
        />
    )
}

export default PrivateRouter

