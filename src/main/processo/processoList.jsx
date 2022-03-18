import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Content from "../../common/template/content/content";
import Table from "../../common/template/table/table";
import api from "../../services/api";
import BoxContent from "../../common/template/boxes/boxContent";
import Pagination from "../../common/template/pagination/pagination";
import { Link } from "react-router-dom";
import FiltroProcesso from "./filtroProcesso";
import Status from '../../common/template/status/status'

const ProcessoList = (props) => {
  const [processos, setProcessos] = useState([]);
  const itemsPerPage = 10;
  const [offset, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({})

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const {codigo, tipo_componente, macroprocesso} = filtros;
        
        const { data } = await api.get(
          `processos/?limit=${itemsPerPage}&offset=${offset}&cod_processo=${
            codigo ? codigo : ""
          }&componente=${
            tipo_componente ? tipo_componente : ""
          }&macroprocesso=${macroprocesso ? macroprocesso : ""}`
        );
        setProcessos(data.results);
        setTotal(data.count);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Ocorreu erro ao obter processos");
      }
    })();
  }, [offset, filtros]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * itemsPerPage) % total;
      setOffSet(newOffset);
    },
    [total]
  );

  const handleFiltro = (data) => {
    setFiltros(data);
  }

  return (
    <>
      <Content title="Processos" action="lista">
        <BoxContent
          color="secondary"
          load={isLoading}
          filter={
            <FiltroProcesso handleFiltro={handleFiltro} />
          }
        >
          <Table
            headers={["Nome", "Gestor", "Proprietário", "Código", "Status", "Ações"]}
          >
            {processos
              ? processos.map((processoContent) => (
                  <tr className="row">
                    <td>{processoContent.nome_processo}</td>
                    <td>{processoContent.gestorPrincipal}</td>
                    <td>{processoContent.proprietario}</td>
                    <td>{processoContent.codigo}</td>
                    <td><Status statusName={processoContent.statusProcesso}/></td>
                    <td>
                      <Link
                        className="btn btn-sm btn-primary"
                        to={`/dcp/${processoContent.id}`}
                      >
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))
              : ""}
          </Table>
          <div className="row">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={total}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </BoxContent>
      </Content>
    </>
  );
};

export default ProcessoList;
