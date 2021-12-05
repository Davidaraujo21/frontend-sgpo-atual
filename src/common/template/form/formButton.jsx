import React from 'react'

const FormButton = ({color, label, isReadOnly}) =>{
    return(
        <>
        {isReadOnly &&
            <div className="form-group local-btn">
                <button className={`btn btn-${color}`} type="submit">
                    {label}
                </button>
            </div>
        }
        </>
    )
}


export default FormButton