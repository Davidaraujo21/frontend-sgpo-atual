import React, { useEffect, useState } from "react";
import CardSimples from "./cardSimples";
import "./dcp.css";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Menu from "../google_docs/menu";
import { toast } from "react-toastify";

export default function DCP() {
  const [processo, setProcesso] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const url = `processos/${id}`;
      try {
        const get_dados = await api.get(url);
        setProcesso(get_dados.data);
      } catch (err) {
        toast.error("Ocorreu um erro ao buscar os dados do dcp");
      }
    }
    fetchData();
  }, [id]);

  return (
    <div class="row mt-1 ">
      <div class="col-xl-10 m-auto">
        <Menu dados_proc={processo} />
        <div class="container l-column">
          <div class="card-columns">
            <CardSimples header="CÓDIGO-NOME DO PROCESSO">
              <p class="card-text">
                {processo.codigo}
                <br></br>
                {processo.nome_processo}
              </p>
            </CardSimples>
            <CardSimples header="FRONTEIRAS (DE- ATÉ)">
              <p class="card-text">
                {processo.fronteiraDe} até {processo.fronteirAte}
              </p>
            </CardSimples>
            <CardSimples header="CADEIA DE VALOR">
              {/*Condicional para sincronizar com a chamada da api e evitar chamar dados undefined*/}
              {processo.macroProcesso_primario &&
                processo.macroProcesso_primario.nome_macroprocesso && (
                  <p class="card-text">
                    {processo.macroProcesso_primario.nome_macroprocesso}
                  </p>
                )}
            </CardSimples>
            <CardSimples header="PROPRIETÁRIO">
              <p class="card-text">{processo.proprietario}</p>
            </CardSimples>
            <CardSimples header="OBJETIVO">
              <p class="card-text">{processo.objetivo}</p>
            </CardSimples>
            <CardSimples header="ENTRADAS/SAÍDAS">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="ETAPAS/ATIVIDADES">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="CLIENTES">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="GESTORES">
              <p class="card-text">{processo.gestorPrincipal}</p>
            </CardSimples>
            <CardSimples header="FERRAMENTAS/MATERIAIS">
              {processo.ferramenta &&
                processo.ferramenta.map((ferr) => (
                  <p class="card-text" key={ferr.id}>
                    {ferr.descricao}
                  </p>
                ))}
            </CardSimples>
            <CardSimples header="ÁREAS ENVOLVIDAS">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="PROCESSOS RELACIONADOS(*)">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="DIRECIONADORES">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="INDICADORES(*)">
              <p class="card-text"></p>
            </CardSimples>
            <CardSimples header="Revisão">
              <p class="card-text">
                <small>Criado/Revisado Por:</small>
                <br></br>
                <small>Aprovado por:</small>
              </p>
            </CardSimples>
          </div>
        </div>
      </div>
    </div>
  );
}
