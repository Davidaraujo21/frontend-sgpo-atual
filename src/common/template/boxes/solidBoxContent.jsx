import React from 'react';


const SolidBoxContent = ({bg, top, children}) =>{
    return(
        <>
        <div style={{background: `${bg}`, padding: "1px", marginTop: `${top ? top : 0}`}}>
            {children}
        </div> 
        </>
    )
}

export default SolidBoxContent;