import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardDeck,
  CardBody,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import api from "../../services/api";
import "./main.css";
import Pesquisa from "./pesquisa";
import { toast } from "react-toastify";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentsFinalistico: [],
      componentsApoio: [],
      componentsDirecionador: [],
      macroprocessos: [],
    };
  }

  componentDidMount() {
    this.getComponents();
  }

  componentAction = (componente) => {
    this.getMacroprocessos(componente);
  };

  getComponents = () => {
    api.get("componentes").then((res) => {
      const components = res.data;

      const componentsFinalistico = components.filter(
        (item) => item.tipo === "finalistico"
      );
      const componentsApoio = components.filter(
        (item) => item.tipo === "apoio"
      );
      const componentsDirecionador = components.filter(
        (item) => item.tipo === "direcionador"
      );

      this.setState({
        componentsFinalistico,
        componentsApoio,
        componentsDirecionador,
      });
    });
  };

  getMacroprocessos = (componentId) => {
    api
      .get("macroprocessos")
      .then((res) => {
        const macroprocessos = res.data;
        const listMacroprocessos = macroprocessos.filter(
          (item) => item.componente_primario === componentId
        );

        if (listMacroprocessos.length > 0) {
          this.setState({ macroprocessos: listMacroprocessos });
          toast.success("Macroprocessos carregados com sucesso");
        } else {
          this.setState({macroprocessos: []})
          toast.warning("Componente sem macroprocessos");
        }
      })
      .catch((err) =>
        toast.error("Ocorreu um erro ao carregar macroprocessos")
      );
  };

  renderComponentes = (componentList) => {
    const list = componentList;
    return list.map((component) => (
      <ListGroupItem
        key={component.id}
        tag="button"
        onClick={() => this.componentAction(component.id)}
      >
        {component.nome_componente}
      </ListGroupItem>
    ));
  };

  render() {
    const { componentsDirecionador, componentsFinalistico, componentsApoio } =
      this.state;
    return (
      <>
        <CardDeck className="Card">
          <div>
            <header />
          </div>
          <Card>
            <CardBody>
              <CardTitle className="TipoComponente" tag="h5">
                Finalístico
              </CardTitle>
              <ListGroup className="Componente card-list finalistico">
                {componentsFinalistico.length > 0 ? (
                  this.renderComponentes(componentsFinalistico)
                ) : (
                  <p>Não existem componentes finalísticos</p>
                )}
              </ListGroup>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle className="TipoComponente" tag="h5">
                Direcionador
              </CardTitle>
              <ListGroup className="Componente card-list direcionador">
                {componentsDirecionador.length > 0 ? (
                  this.renderComponentes(componentsDirecionador)
                ) : (
                  <p>Não existem componentes Direcionadores</p>
                )}
              </ListGroup>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle className="TipoComponente" tag="h5">
                Apoio
              </CardTitle>
              <ListGroup className="Componente card-list apoio">
                {componentsApoio.length > 0 ? (
                  this.renderComponentes(componentsApoio)
                ) : (
                  <p>Não existem componentes de Apoio</p>
                )}
              </ListGroup>
            </CardBody>
          </Card>
        </CardDeck>
        <Pesquisa data={this.state.macroprocessos} perPage={6} />
      </>
    );
  }
}

export default Main;
