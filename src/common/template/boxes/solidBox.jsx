import React from 'react'
import './styles.css'

const SolidBox = ({label, tagName, children}) =>{
    return(
        <>
            <div className={`box box-solid box-info box-dcp item ${tagName}`}>
                <div className="box-header">
                    {label}
                </div>
                <div className="box-body">
                    {children}
                </div>
            </div>
        </>
    )
}


export default SolidBox