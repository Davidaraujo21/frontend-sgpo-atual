import React from 'react'


const Content = (props) =>{
    return(
        <>
            <section className="content-header">
                <h1>{props.title}<small>{props.action ? props.action : ""}</small></h1>
            </section>
            <section className="content">
                {props.children}
            </section>
        </>
    )
}


export default Content