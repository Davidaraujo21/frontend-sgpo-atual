import React from 'react'
import './styles.css'
import Loading from '../effects/loading'

const FormModal = (props) =>{
    return(
        <>
            <div className={`box box-${props.color}`}>
                {props.loadingSubmit && <Loading />}
                <div className="box-header with-border">
                    <h3>{props.label}</h3>
                </div>
                <div className="box-body">
                    {props.children}
                </div>
            </div>
        </>
    )
}


export default FormModal