import React from "react";
import MenuCardHome from "./menuCardHome";
import "./home.css";

const Home = (props) => (
  <div className="cards-local">
    <div className="jumbotron jumbotron-fluid">
      <div className="container d-flex align-items-center">
        <i className="fa fa-bars text-secondary mr-2 h2"></i>
        <h1 className="display-5 text-secondary">Painel de ações</h1>
      </div>
    </div>
    <div className="cards-menu">
      <MenuCardHome
        icon="search"
        text="Pesquisar processos"
        link="/pesquisar"
      />
      <MenuCardHome
        icon="align-left"
        text="Cadastrar Processos"
        link="#cadastrarProc"
      />
      <MenuCardHome
        icon="align-left"
        text="Cadastrar Componentes"
        link="/cadastrarComp"
      />
      <MenuCardHome
        icon="align-left"
        text="Cadastrar Macroprocessos"
        link="/cadastrarMacro"
      />
    </div>
  </div>
);

export default Home;
