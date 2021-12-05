import React from 'react'
import {Link} from 'react-router-dom'

const LinkCadastro = (props) =>{
    return(
        <>
            <Link to={props.path}>
                Clique para cadastrar informações
            </Link>
        </>
    )
}

export default LinkCadastro