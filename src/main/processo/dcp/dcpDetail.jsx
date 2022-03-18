import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SolidBox from "../../../common/template/boxes/solidBox";
import SolidBoxContent from "../../../common/template/boxes/solidBoxContent";
import api from "../../../services/api";
import "./styles.css";
import Loading from "../../../common/template/effects/loading";
import ListInfo from "../../../common/template/list/listInfo";

const DcpDetail = ({ id }) => {
  const [processoData, setProcessoData] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`processos/${id}/`);
        setProcessoData(data);
        setIsFetching(false);
      } catch (err) {
        toast.error("Ocorreu um erro ao obter dados do processo");
        setIsFetching(false);
      }
    })();
  }, [id]);

  return (
    <>
      <div className="local-dcp">
        {isFetching && <Loading />}
        <SolidBox
          label="CÓDIGO"
          tagName={"codigo"}
          isFetching={isFetching}
          center={true}
        >
          <SolidBoxContent bg="#F8F8F8">
            <strong>{processoData?.codigo}</strong>
          </SolidBoxContent>
        </SolidBox>
        <SolidBox
          label="NOME DO PROCESSO"
          tagName={"nome"}
          isFetching={isFetching}
        >
          <SolidBoxContent bg="#F8F8F8">
            {processoData?.nome_processo}
          </SolidBoxContent>
        </SolidBox>
        <SolidBox
          label="FRONTEIRAS (DE- ATÉ)"
          tagName={"fronteira"}
          isFetching={isFetching}
        >
          <div>
            <SolidBoxContent bg="#F8F8F8">
              <strong>De: </strong>
              {processoData?.fronteiraDe}
            </SolidBoxContent>
            <SolidBoxContent bg="#F8F8F8" top="10px">
              <strong>Até: </strong>
              {processoData?.fronteiraAte}
            </SolidBoxContent>
          </div>
        </SolidBox>
        <SolidBox
          label="CADEIA DE VALOR"
          tagName={"cadeia-valor"}
          isFetching={isFetching}
        >
          <div>
            <SolidBoxContent bg="#F8F8F8">
              <strong>Componente: </strong>
              {
                processoData?.macroProcesso_primario?.componente_primario
                  .nome_componente
              }
            </SolidBoxContent>
            <SolidBoxContent bg="#F8F8F8" top="10px">
              <strong>Macroprocesso: </strong>
              {processoData?.macroProcesso_primario?.nome_macroprocesso}
            </SolidBoxContent>
          </div>
        </SolidBox>
        <SolidBox
          label="PROPRIETÁRIO"
          tagName={"proprietario"}
          isFetching={isFetching}
          icon={"user"}
        >
          <SolidBoxContent bg="#F8F8F8">{processoData?.proprietario}</SolidBoxContent>
        </SolidBox>
        <SolidBox
          label="OBJETIVO"
          tagName={"objetivo"}
          isFetching={isFetching}
          icon={"bullseye"}
        >
          <SolidBoxContent bg="#F8F8F8">{processoData?.objetivo}</SolidBoxContent>
        </SolidBox>
        <SolidBox
          label="GESTOR(ES)"
          tagName={"gestores"}
          isFetching={isFetching}
          icon={"users"}
        >
          <SolidBoxContent bg="#F8F8F8">{processoData?.gestorPrincipal}</SolidBoxContent>
        </SolidBox>
        <SolidBox
          label="ENTRADAS"
          tagName={"entradas"}
          isFetching={isFetching}
          icon={"sign-in"}
        >
          <ListInfo>
            {processoData?.entradas.map((ent) => (
              <li key={ent.id}>{ent.descricao}</li>
            ))}
          </ListInfo>
        </SolidBox>
        <SolidBox
          label="ETAPA/ATIVIDADES"
          tagName={"etapas"}
          isFetching={isFetching}
          icon={"list-ol"}
        >
          <div style={{ background: "#F8F8F8", padding: "1px" }}>
            {processoData?.etapas}
          </div>
        </SolidBox>
        <SolidBox
          label="SAIDAS"
          tagName={"saidas"}
          isFetching={isFetching}
          icon={"sign-out"}
        >
          <ListInfo>
            {processoData?.saidas.map((saida) => (
              <li key={saida.id}>{saida.descricao}</li>
            ))}
          </ListInfo>
        </SolidBox>
        <SolidBox
          label="CLIENTES"
          tagName={"clientes"}
          isFetching={isFetching}
          icon={"smile-o"}
        >
          <ListInfo>
            {processoData?.clientes.map((cliente) => (
              <li key={cliente.id}>{cliente.nome}</li>
            ))}
          </ListInfo>
        </SolidBox>
        <SolidBox
          label="FERRAMENTAS/MATERIAIS"
          tagName={"ferramentas"}
          isFetching={isFetching}
          icon={"cogs"}
        >
          <ListInfo>
            {processoData?.ferramenta.map((ferr) => (
              <li key={ferr.id}>{ferr.descricao}</li>
            ))}
          </ListInfo>
        </SolidBox>
        <SolidBox
          label="DIRECIONADORES"
          tagName={"direcionadores"}
          isFetching={isFetching}
          icon={"list-ol"}
        >
          <ListInfo>
            {processoData?.direcionador.map((dir) => (
              <li key={dir.id}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={dir.url ? dir.url : "#"}
                >
                  {dir.numero}/{dir.orgao}/{dir.data}
                </a>
              </li>
            ))}
          </ListInfo>
        </SolidBox>
      </div>
    </>
  );
};

export default DcpDetail;
