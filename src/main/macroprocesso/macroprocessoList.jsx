import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Content from "../../common/template/content/content";
import Table from "../../common/template/table/table";
import api from "../../services/api";
import BoxContent from "../../common/template/boxes/boxContent";
import Pagination from "../../common/template/pagination/pagination";

const MacroprocessoList = (props) => {
  const [macroprocessos, setMacroprocessos] = useState([]);
  const itemsPerPage = 10;
  const [offset, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          `macroprocessos/?limit=${itemsPerPage}&offset=${offset}`
        );
        setMacroprocessos(data.results);
        setTotal(data.count);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Ocorreu um erro ao obter macroprocessos");
      }
    })();
  }, [offset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * itemsPerPage) % total;
      setOffSet(newOffset);
    },
    [total]
  );

  return (
    <>
      <Content title="Macroprocessos" action="lista">
        <BoxContent
          color="secondary"
          label="Lista de macroprocessos"
          load={isLoading}
        >
          <Table headers={["Nome", "Código", "Componente primário"]}>
            {macroprocessos
              ? macroprocessos.map((macroprocessoContent) => (
                  <tr className="row">
                    <td>{macroprocessoContent.nome_macroprocesso}</td>
                    <td>{macroprocessoContent.codigo}</td>
                    <td>
                      {macroprocessoContent.componente_primario.nome_componente}
                    </td>
                    <td>
                      <a className="btn btn-sm btn-primary" href="/">
                        Detalhes
                      </a>
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
