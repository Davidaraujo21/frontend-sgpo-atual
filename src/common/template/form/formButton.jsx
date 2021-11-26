import React from 'react'

const FormButton = (props) =>{
    return(
        <>
            <div className="form-group local-btn">
                <button className={`btn btn-${props.color}`} type="submit">
                    {props.label}
                </button>
            </div>
        </>
    )
}


export default FormButton