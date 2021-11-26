import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./footer.css";
import { Table } from "reactstrap";

const Footer = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  
  console.log("props in footer", props.data);
 
  function navigateToDcp() {
    history.push("/dcp");
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {props.data.map((processo) => (
        <Table>
          <thead className="tituloTabela">
            <tr>
              <th>Cod. Macro-processo</th>
              <th>Macro-processo</th>
              <th>Processo</th>
              <th>Nome do Processo</th>
              <th>Fronteira de</th>
              <th>Fronteira até</th>
              <th>Proprietário</th>
              <th>Gestor principal</th>
              <th>PROAD</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody className="TabelaConsultaPesquisa">
            <tr>
	  		  <td></td>
			  <td></td>
              <td>{processo.codigo}</td>
              <td>{processo.nome_processo}</td>
              <td>{processo.fronteiraDe}</td>
              <td>{processo.fronteiraAte}</td>
              <td>{processo.proprietario}</td>
              <td>{processo.gestorPrincipal}</td>
              <td>{processo.proad}</td>
              <td>
                <button
                  type="button"
                  className="BotaoDetalhar"
                  onClick={navigateToDcp}
                >
                  detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      ))}
    </>
  );
};

export default Footer;
