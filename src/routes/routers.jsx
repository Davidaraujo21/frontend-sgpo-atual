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
import Page404 from "../common/template/page404/404";

export default function Routers(props) {
  return (
      <Switch>
        <PrivateRouter exact path="/" component={Home}/>
        <PrivateRouter exact path="/cadastroComponente" component={CadastroComponente}/>
        <PrivateRouter exact path="/cadastroMacroprocesso" component={CadastroMacroprocesso}/>
        <PrivateRouter exact path="/cadastroProcesso" component={CadastroProcesso}/>
        <PrivateRouter exact path="/listaProcessos" component={ProcessoList}/>
        <PrivateRouter exact path="/listaMacroprocessos" component={MacroprocessoList} />
        <PrivateRouter exact path="/listaComponentes" component={ComponenteList} />
        <PrivateRouter path="/dcp/:id" component={Dcp} />
        <PrivateRouter path="/detalhesComponente/:id" component={ComponenteDetalhes} />
        <PrivateRouter path="/detalhesMacroprocesso/:id" component={MacroprocessoDetalhes} />
        <PrivateRouter path="*" component={Page404}/>
      </Switch>
  );
}
