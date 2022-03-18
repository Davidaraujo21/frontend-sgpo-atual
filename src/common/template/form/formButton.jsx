import React from 'react'

const FormButton = ({color, label, isReadOnly, type}) =>{
    return(
        <>
        {!isReadOnly &&
            <div className="form-group local-btn">
                <button className={`btn btn-${color}`} type={type ? type : "submit"}>
                    {label}
                </button>
            </div>
        }
        </>
    )
}


export default FormButton