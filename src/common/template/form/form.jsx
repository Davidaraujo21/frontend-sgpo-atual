import React from 'react'
import './styles.css'
import Loading from '../effects/loading'

const FormModal = (props) =>{
    return(
        <>
            <div className={`box box-${props.color}`}>
                {props.loadingSubmit && <Loading />}
                <div className="box-header with-border">
                    <h4>{props.label}</h4>
                    <div>
                        {props.actions ? props.actions : ""}
                    </div>
                </div>
                <div className="box-body">
                    {props.children}
                </div>
            </div>
        </>
    )
}


export default FormModal