import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'
import './styles.css'

const Menu = () =>{
    return(
        <>
            <section className="sidebar-menu">
                <MenuItem path="/" label="Home" icon="home"/>
                <MenuTree label="Componente" icon="book">
                    <MenuItem path="/cadastroComponente" label="Cadastrar componentes" icon="plus"/>
                    <MenuItem path="/" label="Visualizar componentes" icon="list"/>
                </MenuTree>
                <MenuTree label="Macroprocessos" icon="book">
                    <MenuItem path="/cadastroMacroprocesso" label="Cadastrar macroprocessos" icon="plus"/>
                    <MenuItem path="/" label="Visualizar macroprocessos" icon="list"/>
                </MenuTree>
                <MenuTree label="Processos" icon="book">
                    <MenuTree label="Informações processos" icon="book" submenu>
                        <MenuItem path="/cadastroParte" label="Cadastrar partes" icon="plus" />
                        <MenuItem path="/cadastroDirecionador" label="Cadastrar direcionadores" icon="plus" />
                        <MenuItem path="/cadastroFerramentaMaterial" label="Cadastrar materiais" icon="plus" />
                    </MenuTree>
                    <MenuItem path="/cadastroProcesso" label="Cadastrar processos" icon="plus"/>
                    <MenuItem path="/" label="Visualizar processos" icon="list"/>
                </MenuTree>
            </section>
        </>
    )
}


export default Menu;