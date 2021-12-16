import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SolidBox from "../../../common/template/boxes/solidBox";
import api from "../../../services/api";
import "./styles.css";

const DcpDetail = ({ id }) => {
  const [processo, setProcesso] = useState();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`processos/${id}`);
        setProcesso(data);
        console.log(data);
      } catch (err) {
        toast.error("Ocorreu um erro ao obter dados do processo");
      }
    })();
  }, [id]);

  return (
    <>
      <div className="local-dcp">
        <SolidBox label="CÓDIGO-NOME DO PROCESSO" tagName={"codigo-nome"}>
          <div>
            {processo?.codigo}-{processo?.nome_processo}
          </div>
        </SolidBox>
        <SolidBox label="FRONTEIRAS (DE- ATÉ)" tagName={"fronteira"}>
          <div>
            <div>
            <strong>De: </strong>{processo?.fronteiraDe}
            </div>
            <div>
              <strong>Até: </strong>{processo?.fronteiraAte}
            </div> 
          </div>
        </SolidBox>
        <SolidBox label="CADEIA DE VALOR" tagName={"cadeia-valor"}>
          <div>
            <div>
              <strong>Componente:{" "}</strong>
              {
                processo?.macroProcesso_primario?.componente_primario
                  .nome_componente
              }
            </div>
            <div>
              <strong>Macroprocesso:{" "}</strong>
              {processo?.macroProcesso_primario?.nome_macroprocesso}
            </div>
          </div>
        </SolidBox>
        <SolidBox label="PROPRIETÁRIO" tagName={"proprietario"}>
          <div>{processo?.proprietario}</div>
        </SolidBox>
        <SolidBox label="OBJETIVO" tagName={"objetivo"}>
          <div>{processo?.objetivo}</div>
        </SolidBox>
        <SolidBox label="GESTOR(ES)" tagName={"gestores"}>
          <div>{processo?.gestorPrincipal}</div>
        </SolidBox>
        <SolidBox label="ENTRADAS" tagName={"entradas"}>
          <div>
            <ul>
              {processo?.entradas.map((ent) =>
                <li key={ent.id}>{ent.descricao}</li>
              )}
            </ul>
          </div>
        </SolidBox>
        <SolidBox label="ETAPA/ATIVIDADES" tagName={"etapas"}>
          <div>{processo?.etapas}</div>
        </SolidBox>
        <SolidBox label="SAIDAS" tagName={"saidas"}>
          <div>
            <ul>
              {processo?.saidas.map((saida) =>
                <li key={saida.id}>{saida.descricao}</li>
              )}
            </ul>
          </div>
        </SolidBox>
        <SolidBox label="CLIENTES" tagName={"clientes"}>
          <div>
            <ul>
              {processo?.clientes.map((cliente) => (
                <li key={cliente.id}>{cliente.nome}</li>
              ))}
            </ul>
          </div>
        </SolidBox>
        <SolidBox label="FERRAMENTAS/MATERIAIS" tagName={"ferramentas"}>
          <div>
            <ul>
              {processo?.ferramenta.map((ferr) => (
                <li key={ferr.id}>{ferr.descricao}</li>
              ))}
            </ul>
          </div>
        </SolidBox>
        <SolidBox
          label="PROCESSOS RELACIONADOS"
          tagName={"processos-relacionados"}
        />
        <SolidBox label="DIRECIONADORES" tagName={"direcionadores"}>
          <div>
            <ul>
              {processo?.direcionador.map((dir) => (
                <li key={dir.id}>
                  <a target="_blank" rel="noreferrer" href={dir.url ? dir.url : "#"}>
                    {dir.numero}/{dir.orgao}/{dir.data}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SolidBox>
      </div>
    </>
  );
};

export default DcpDetail;
