import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = (props) =>{
    return(
        <>
            <li>
                <Link to={props.path}>
                    <i className={`fa fa-${props.icon}`}></i> {props.label}
                </Link> 
            </li>
        </>
    )
}


export default MenuItem;