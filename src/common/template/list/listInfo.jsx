import React from 'react'
import './styles.css'

const ListInfo = ({children}) =>{
    return(
        <>
            <div className="list-info">
                <ul>
                    {children}
                </ul>
            </div>
        </>
    )
}


export default ListInfo;