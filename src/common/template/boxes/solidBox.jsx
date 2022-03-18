import React from 'react'
import './styles.css'

const SolidBox = ({label, tagName, children, isFetching, center, icon}) =>{
    return(
        <>
            <div className={`box box-solid box-info box-dcp item ${tagName}`}>
                {isFetching && <div className="overlay" />}
                <div className="box-header">
                    {icon && <i className={`fa fa-${icon}`} aria-hidden="true"></i>}
                    {label}
                </div>
                <div className={`box-body ${center ? 'center-content' : ""}`}>
                    {children}
                </div>
            </div>
        </>
    )
}


export default SolidBox