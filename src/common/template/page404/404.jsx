import React from 'react';
import Content from '../content/content';
import {Link} from 'react-router-dom';
import './styles.css';

const Page404 = () =>{
    return(
        <>
            <Content title="Erro 404">
                <div className="error-page">
                    <h2 className="headline text-yellow">404</h2>
                    <div className="error-content">
                        <h3><i className="fa fa-warning text-yellow"></i> Desculpa, essa página não existe
                        </h3>
                        <p>Retorne para a página inicial ou escolha uma outra página existente</p>
                        <p><Link to="/">Ir para a home</Link></p>
                    </div>
                </div>
            </Content>
        </>
    )
}


export default Page404;