import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Col, Row } from "reactstrap";
import "./tables.css";

export default function TableProcessos(props) {
  let history = useHistory();
  const goToPage = (url) => history.push(url);

  return (
    <>
      <Row className="justify-content-center p-4">
        <Col xs="12" md="10">
          <Table className="tabela">
            <thead>
              <th>Processo</th>
              <th>Nome do Processo</th>
              <th>Fronteira de</th>
              <th>Fronteira até</th>
              <th>Proprietário</th>
              <th>Gestor principal</th>
              <th>PROAD</th>
              <th>Detalhes</th>
            </thead>
            <tbody>
              {props.processos.length > 0
                ? props.processos.map((proc) => (
                    <tr>
                      <td>{proc.codigo}</td>
                      <td>{proc.nome_processo}</td>
                      <td>{proc.fronteiraDe}</td>
                      <td>{proc.fronteirAte}</td>
                      <td>{proc.proprietario}</td>
                      <td>{proc.gestorPrincipal}</td>
                      <td>{proc.proad}</td>
                      <td>
                        <button
                          onClick={() => goToPage(`processos/${proc.id}`)}
                          className="btn-sm btn-warning"
                        >
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </Table>
          {props.processos.length === 0 && (
            <p className="text-center">
              Selecione um componente e pesquise um macroprocesso
            </p>
          )}
        </Col>
      </Row>
    </>
  );
}
