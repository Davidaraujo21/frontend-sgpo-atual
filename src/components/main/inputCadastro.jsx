import React, { useEffect } from 'react'
// import InputMask from 'react-input-mask'

const InputCadastro = ({label, type, dataSize, regex, name, placeholder, handleChange, value, checkSubmit, mask, validCodigo}) =>{
        
    // const markInput = () =>{
    //     if(checkSubmit && String(value).trim().length === 0){
    //         return "border-danger"
    //     }
    // }

    // const checkCodigo = () =>{
    //     if(value.length === dataSize && checkMask(value)){           
    //         validCodigo(true)
    //     }else{           
    //         validCodigo(false)
    //     }
    // }

    // const checkMask = (value) =>{
    //     if(regex.test(value)){
    //         const parser_codigo = value.replace(".", "").replace(".", "") 
    //         if(parseInt(parser_codigo) > 0){
    //             return true
    //         }
    //     }
    //     return false
    // }

    // useEffect(() =>{
    //     mask && checkCodigo()
    // }, [value])

    return(
    <>
        <label className="form-label">{label}</label>
        <input
            onChange={
                handleChange
            }
            className={`form-control`}
            type={type}
            placeholder={placeholder}  
        />
    </>
    )
}

export default React.memo(InputCadastro)