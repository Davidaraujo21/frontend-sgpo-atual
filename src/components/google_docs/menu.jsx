import React, { Component } from "react";
import api from "../../services/api";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctype: "",
      processo: {},
      auth_conta: false,
      doc_load: false,
      alert: this.props.alert,
    };
  }

  carregarProcesso = () => {
    this.setState({ processo: this.props.dados_proc, auth_conta: true });
  };

  handleDoctype = (e) => {
    this.setState({ doctype: e.target.value });
  };

  makeConnection = () => {
    this.setState({ auth_conta: false, auth_error: false });
    api
      .get("docs/connection/")
      .then((res) => toast.success("Conexão estabelecida com sucesso"))
      .then((res) => this.carregarProcesso())
      .catch((err) => toast.error("Erro de conexão"));
  };

  criarDocumento = () => {
    this.state.doctype && this.setState({ doc_load: true });
    api
      .post("docs/gerarDocumento/", {
        doc_modelo: this.state.doctype,
        nome_processo: this.state.processo.nome_processo,
        codigo_processo: this.state.processo.codigo,
        objetivo_processo: this.state.processo.objetivo,
        cadeia_valor:
          this.state.processo.macroProcesso_primario.nome_macroprocesso,
        processo_gestor: this.state.processo.gestorPrincipal,
        processo_proprietario: this.state.processo.proprietario,
      })
      .then((res) => {
        toast.success("Documento gerado com sucesso");
        this.setState({ doc_load: false });
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao gerar o documento");
        this.setState({ doc_load: false });
      });
  };

  render() {
    return (
      <>
        <div class="row mb-3 justify-content-end">
          {this.state.auth_conta && (
            <div class="form-group col-md-4">
              <select
                id="inputState"
                class="form-control"
                onChange={(e) => this.handleDoctype(e)}
              >
                <option selected>Selecione o tipo de documento ...</option>
                <option value="template A">Documento 1</option>
                <option value="template B">Documento 2</option>
              </select>
            </div>
          )}
          <div class="col-md-3">
            {this.state.auth_conta ? (
              <button
                type="button"
                class="btn btn-sm btn-success btn-block"
                onClick={this.criarDocumento}
              >
                Gerar documento
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-sm btn-warning btn-block"
                onClick={this.makeConnection}
              >
                Estabelecer conexao google docs
              </button>
            )}
          </div>
          {this.state.doc_load && <Spinner size="sm" color="primary" />}
        </div>
      </>
    );
  }
}

export default Menu;
