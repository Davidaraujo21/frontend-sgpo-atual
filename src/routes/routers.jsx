import React from "react";
import { Switch, Route } from "react-router-dom";

import CadastroComponente from "../main/componente/cadastro";
import CadastroMacroprocesso from "../main/macroprocesso/cadastro";
import CadastroProcesso from "../main/processo/cadastro";
import Home from "../main/home/home";
import ProcessoList from "../main/processo/processoList";
import MacroprocessoList from "../main/macroprocesso/macroprocessoList";
import ComponenteList from "../main/componente/componenteLIst";
import Dcp from "../main/processo/dcp/dcp";
import ComponenteDetalhes from "../main/componente/componenteDetail";
import MacroprocessoDetalhes from "../main/macroprocesso/macroprocessoDetail";
import PrivateRouter from "./privateRouter";

export default function Routers(props) {
  return (
      <Switch>
        <PrivateRouter exact path="/" component={Home}/>
        <PrivateRouter path="/cadastroComponente" component={CadastroComponente}/>
        <PrivateRouter path="/cadastroMacroprocesso" component={CadastroMacroprocesso}/>
        <PrivateRouter path="/cadastroProcesso" component={CadastroProcesso}/>
        <PrivateRouter path="/listaProcessos" component={ProcessoList}/>
        <PrivateRouter path="/listaMacroprocessos" component={MacroprocessoList} />
        <PrivateRouter path="/listaComponentes" component={ComponenteList} />
        <PrivateRouter path="/dcp/:id" component={Dcp} />
        <PrivateRouter path="/detalhesComponente/:id" component={ComponenteDetalhes} />
        <PrivateRouter path="/detalhesMacroprocesso/:id" component={MacroprocessoDetalhes} />
      </Switch>
  );
}
