import React from "react";
import Main from "./components/main/main";
import Dcp from "./components/main/dcp";
import { Switch, Route } from "react-router-dom";
import Login from "./components/main/login";
import Sobre from "./components/main/sobre";
import Contato from "./components/main/contato";
// import Home from "./components/main/home";
// import cadastroComponente from "./components/main/cadastros/cadastroComponente";
import PrivateRouter from './privateRouter'
// import CadastroMacroprocesso from "./components/main/cadastros/cadastroMacro";

import CadastroComponente from "./main/componente/cadastro";
import CadastroMacroprocesso from "./main/macroprocesso/cadastro";
import CadastroProcesso from "./main/processo/cadastro";
import Home from "./main/home/home";
import CadastroPartes from "./main/processo/partes/cadastro";
import CadastroDirecionador from "./main/processo/direcionadores/cadastro";
import CadastroMaterial from "./main/processo/ferramenta/cadastro";

export default function Routers(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/cadastroComponente" component={CadastroComponente}/>
      <Route path="/cadastroMacroprocesso" component={CadastroMacroprocesso}/>
      <Route path="/cadastroProcesso" component={CadastroProcesso}/>
      <Route path="/cadastroParte" component={CadastroPartes}/>
      <Route path="/cadastroDirecionador" component={CadastroDirecionador}/>
      <Route path="/cadastroFerramentaMaterial" component={CadastroMaterial}/>
    </Switch>
    
    // <Switch>
    //   <PrivateRouter exact path="/" component={Home} />
    //   <PrivateRouter path="/pesquisar" component={Main} />
    //   <PrivateRouter exact path="/processos/:id" component={Dcp} />
    //   <PrivateRouter path="/sobre" component={Sobre} />
    //   <PrivateRouter path="/contato" component={Contato} />
    //   <PrivateRouter path="/cadastrarComp" component={cadastroComponente} />
    //   <PrivateRouter path="/cadastrarMacro" component={CadastroMacroprocesso} />
    // </Switch>
  );
}
