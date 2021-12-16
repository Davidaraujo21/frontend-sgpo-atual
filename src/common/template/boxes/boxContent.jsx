import React from 'react'
import Loading from '../effects/loading'

const BoxContent = (props) =>{
    return(
        <>
            <div className={`box box-${props.color}`}>
                {props.load && <Loading />}
                <div className="box-header with-border">
                    <h3>{props.label}</h3>
                    <div>
                        {props.filter ? props.filter: ""}
                    </div>
                </div>
                <div className="box-body">
                    {props.children}
                </div>
            </div>
        </>
    )
}


export default BoxContent