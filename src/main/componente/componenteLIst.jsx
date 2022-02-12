import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Content from "../../common/template/content/content";
import Table from "../../common/template/table/table";
import api from "../../services/api";
import BoxContent from "../../common/template/boxes/boxContent";
import Pagination from "../../common/template/pagination/pagination";
import FiltroComponente from "./componenteFiltro";
import { Link } from "react-router-dom";
import Layout from "../../common/template/layoutDashboard/layout";

const ComponenteList = (props) => {
  const [componentes, setComponentes] = useState([]);
  const itemsPerPage = 10;
  const [offset, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({});

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const {codigo, tipo_componente} = filtros;
        const { data } = await api.get(
          `componentes/?limit=${itemsPerPage}&offset=${offset}&componente=${tipo_componente ? tipo_componente : ""}&cod_componente=${codigo ? codigo : ""}`
        );
        setComponentes(data.results);
        setTotal(data.count);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Ocorreu um erro ao obter componentes");
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
    console.log(data);
    setFiltros(data);
  }

  return (
    <>
      <Content title="Componentes" action="lista">
        <BoxContent
          color="secondary"
          load={isLoading}
          filter={
            <FiltroComponente handleFiltro={handleFiltro} />
          }
        >
          <Table headers={["Nome", "Código", "Tipo", "Ações"]}>
            {componentes
              ? componentes.map((componenteContent) => (
                  <tr className="row">
                    <td>{componenteContent.nome_componente}</td>
                    <td>{componenteContent.codigo}</td>
                    <td>{componenteContent.tipo}</td>
                    <td>
                      <Link className="btn btn-sm btn-primary" to={`/detalhesComponente/${componenteContent.id}`}>
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

export default ComponenteList;
