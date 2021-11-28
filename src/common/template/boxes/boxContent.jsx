import React from 'react'
import Loading from '../effects/loading'

const BoxContent = (props) =>{
    return(
        <>
            <div className={`box box-${props.color}`}>
                {props.load && <Loading />}
                <div className="box-header with-border">
                    <h4>{props.label}</h4>
                </div>
                <div className="box-body">
                    {props.children}
                </div>
            </div>
        </>
    )
}


export default BoxContent