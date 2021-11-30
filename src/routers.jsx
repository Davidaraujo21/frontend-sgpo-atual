import React from "react";
import { Switch, Route } from "react-router-dom";

import CadastroComponente from "./main/componente/cadastro";
import CadastroMacroprocesso from "./main/macroprocesso/cadastro";
import CadastroProcesso from "./main/processo/cadastro";
import Home from "./main/home/home";
import CadastroPartes from "./main/processo/partes/cadastro";
import CadastroDirecionador from "./main/processo/direcionadores/cadastro";
import CadastroMaterial from "./main/processo/ferramenta/cadastro";
import ProcessoList from "./main/processo/processoList";
import MacroprocessoList from "./main/macroprocesso/macroprocessoList";
import ComponenteList from "./main/componente/componenteLIst";

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
      <Route path="/listaProcessos" component={ProcessoList}/>
      <Route path="/listaMacroprocessos" component={MacroprocessoList} />
      <Route path="/listaComponentes" component={ComponenteList} />
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
