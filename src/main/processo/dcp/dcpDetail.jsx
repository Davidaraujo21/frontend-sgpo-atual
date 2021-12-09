import React from "react";
import SolidBox from "../../../common/template/boxes/solidBox";
import "./styles.css";

const DcpDetail = () => {
  return (
    <>
      <div className="local-dcp">
        <SolidBox label="CÓDIGO-NOME DO PROCESSO" tagName={"codigo-nome"} />
        <SolidBox label="FRONTEIRAS (DE- ATÉ)" tagName={"fronteira"} />
        <SolidBox label="CADEIA DE VALOR" tagName={"cadeia-valor"} />
        <SolidBox label="PROPRIETÁRIO" tagName={"proprietario"} />
        <SolidBox label="OBJETIVO" tagName={"objetivo"} />
        <SolidBox label="PROPRIETÁRIO" tagName={"proprietario"} />
        <SolidBox label="GESTOR(ES)" tagName={"gestores"} />
        <SolidBox label="ENTRADAS" tagName={"entradas"} />
        <SolidBox label="ETAPA/ATIVIDADES" tagName={"etapas"} />
        <SolidBox label="SAIDAS" tagName={"saidas"} />
        <SolidBox label="CLIENTES" tagName={"clientes"} />
        <SolidBox label="FERRAMENTAS/MATERIAIS" tagName={"ferramentas"} />
        <SolidBox label="ÁREAS ENVOLVIDAS" tagName={"areas"} />
        <SolidBox label="PROCESSOS RELACIONADOS" tagName={"processos-relacionados"} />
        <SolidBox label="DIRECIONADORES" tagName={"direcionadores"} />
        <SolidBox label="INDICADORES" tagName={"indicadores"} />
      </div>
    </>
  );
};

export default DcpDetail;
