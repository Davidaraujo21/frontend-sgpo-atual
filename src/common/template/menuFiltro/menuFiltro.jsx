import React from 'react'

const MenuFiltro = (props) =>{
    return(
        <>
            <div className="box box-primary box-solid">
                <div className="box-header with-border">
                    <h1 className="box-title">{props.title}</h1>
                <div className="box-tools pull-right">
                    <span className="label label-default">Filtro de pesquisa</span>
                </div>
                </div>
                <div className="box-body">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default MenuFiltro