import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Content from "../../common/template/content/content";
import Table from "../../common/template/table/table";
import api from "../../services/api";
import BoxContent from "../../common/template/boxes/boxContent";
import Pagination from "../../common/template/pagination/pagination";
import { Link } from "react-router-dom";
import FiltroMacroprocesso from "./macroprocessoFiltro";
import Layout from "../../common/template/layoutDashboard/layout";

const MacroprocessoList = (props) => {
  const [macroprocessos, setMacroprocessos] = useState([]);
  const itemsPerPage = 10;
  const [offset, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({})

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {

        const {codigo, componente} = filtros
        const { data } = await api.get(
          `macroprocessos/?limit=${itemsPerPage}&offset=${offset}&cod_macroprocesso=${codigo ? codigo : ""}&componente=${componente ? componente : ""}`
        );
        setMacroprocessos(data.results);
        setTotal(data.count);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Ocorreu um erro ao obter macroprocessos");
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

  const handleFiltro = (data) =>{
    setFiltros(data)
  }

  return (
    <>
      <Content title="Macroprocessos" action="lista">
        <BoxContent
          color="secondary"
          load={isLoading}
          filter={
            <FiltroMacroprocesso handleFiltro={handleFiltro} />
          }
        >
          <Table headers={["Nome", "Código", "Componente primário", "Ações"]}>
            {macroprocessos
              ? macroprocessos.map((macroprocessoContent) => (
                  <tr className="row">
                    <td>{macroprocessoContent.nome_macroprocesso}</td>
                    <td>{macroprocessoContent.codigo}</td>
                    <td>
                      {macroprocessoContent.componente_primario.nome_componente}
                    </td>
                    <td>
                      <Link className="btn btn-sm btn-primary" to={`/detalhesMacroprocesso/${macroprocessoContent.id}`}>
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

export default MacroprocessoList;
