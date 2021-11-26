import React, { useState, useEffect } from "react";
import "./pesquisa.css";
import api from "../../services/api";
import TableProcessos from "./table";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const Pesquisa = (props) => {
  const [macroprocesso, setMacroprocesso] = useState("");
  const [processo, setProcesso] = useState([]);
  const [ord, setOrd] = useState("");
  const [offSet, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const { perPage } = props;

  const searchMacroprocesso = async () => {
    if (macroprocesso) {
      try {
        const url = `/processos/?cod_processo=&processo_nome=&macroprocesso=${macroprocesso}
          &proprietario=&gestorPrincipal=&ordering=${ord}&limit=${perPage}&offset=${offSet}`;
        const res = await api.get(url);
        const list_processo = res.data.results;
        setProcesso(list_processo);
        setPageCount(Math.ceil(res.data.count / perPage));
      } catch (err) {
        toast.error("Erro ao pesquisar processos");
      }
    }
  };

  useEffect(() => {
    searchMacroprocesso();
  }, [offSet]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offSet = Math.ceil(selected * perPage);
    setOffset(offSet);
  };

  return (
    <>
      <div class="row">
        <div class="col-md-4 offset-md-3">
          <div class="form-group ">
            <select
              id="inputState"
              class="form-control"
              onChange={(event) => setMacroprocesso(event.target.value)}
            >
              <option selected>Selecione o macro-processo ...</option>
              {props.data.map((macroprocesso) => (
                <option
                  key={macroprocesso.id}
                  value={macroprocesso.nome_macroprocesso}
                >
                  {macroprocesso.nome_macroprocesso}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div class="col-md-2">
          <button
            type="button"
            class={`btn btn-info btn-block ${props.data.length > 0 ? "" : "disabled"}`}
            onClick={searchMacroprocesso}
            disabled={props.data.length > 0 ? false : true}
          >
            Pesquisar
          </button>
        </div>
      </div>
      {processo.length > 0 && (
        <div className="row">
          <div class="col-md-4 offset-md-3">
            <div class="form-group">
              <select
                id="inputState"
                class="form-control"
                onChange={(event) => setOrd(event.target.value)}
              >
                <option selected>Selecione a ordenação ...</option>
                <option value="nome_processo">Nome processo ascendente</option>
                <option value="-nome_processo">
                  Nome processo descendente
                </option>
                <option value="codigo">Codigo processo ascendente</option>
                <option value="-codigo">Código processo descendente</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <button
              type="button"
              class="btn btn-primary btn-block"
              onClick={searchMacroprocesso}
            >
              Ordenar
            </button>
          </div>
        </div>
      )}
      <div>
        <TableProcessos processos={processo} />
        {pageCount > 0 && (
          <ReactPaginate
            previousLabel={<i className="fa fa-arrow-left"></i>}
            nextLabel={<i className="fa fa-arrow-right"></i>}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    </>
  );
};

export default Pesquisa;
