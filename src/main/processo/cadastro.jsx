import React, { useState, useEffect } from "react";
import Content from "../../common/template/content/content";
import FormModal from "../../common/template/form/form";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { toast } from "react-toastify";
import LinkCadastro from "../../common/template/form/linkCadastro";
import { useHistory } from "react-router-dom";
import FormButton from "../../common/template/form/formButton";
import CadastroMaterial from "./ferramenta/cadastro";
import "./styles.css";
import CadastroPartes from "./partes/cadastro";
import CadastroCliente from "./cliente/cliente";
import CadastroDirecionador from "./direcionadores/cadastro";
import CadastroEntradas from "./entradas/cadastro";
import CadastroSaidas from "./saidas/cadastro"

const CadastroProcesso = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [macroprocessos, setMacroprocessos] = useState([]);
  const [partes, setPartes] = useState([]);
  const [direcionadores, setDirecionadores] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();
  const [isOpenFerramentas, setIsOpenFerramentas] = useState(false);
  const [isOpenPartes, setIsOpenPartes] = useState(false);
  const [isOpenClientes, setIsOpenClientes] = useState(false);
  const [isOpenDirecionadores, setIsOpenDirecionadores] = useState(false);
  const [isOpenEntradas, setIsOpenEntradas] = useState(false);
  const [isOpenSaidas, setIsOpenSaidas] = useState(false);

  const onSubmit = async (data) => {
    if (
      ferramentas.length > 0 &&
      partes.length > 0 &&
      clientes.length > 0 &&
      entradas.length > 0 &&
      saidas.length > 0
    ) {
      setIsSubmit(true);
      const ferr = ferramentas.map((ferr) => ferr.id);
      const part = partes.map((part) => part.id);
      const dir = direcionadores.map((dir) => dir.id)
      const client = clientes.map((cliente) => cliente.id);
      const entr = entradas.map((entrada) => entrada.id)
      const said = saidas.map((saida) => saida.id)
      try {
        const processo_obj = {
          ...data,
          ferramenta: ferr,
          parte: part,
          direcionador: dir,
          clientes: client,
          entradas: entr,
          saidas: said
        };
        await api.post("processos/", processo_obj);
        reset({ codigo: "" });
        setFerramentas([]);
        setPartes([]);
        setClientes([]);
        setEntradas([]);
        setSaidas([]);
        toast.success("Processo cadastrado com sucesso");
        setIsSubmit(false);
        history.push("/listaProcessos");
      } catch (err) {
        toast.error("Ocorreu um erro ao cadastrar processo");
        setIsSubmit(false);
      }
    } else {
      toast.error("Informe todas as informações necessárias para o processo");
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const {data} = await api.get("macroprocessos/");
        setMacroprocessos(data);
      } catch (err) {
        toast.error("Ocorreu um erro ao carregar dados nos campos");
      }
    })();
  }, []);

  const toggleFerramentas = () => {
    setIsOpenFerramentas(!isOpenFerramentas);
  };

  const togglePartes = () => {
    setIsOpenPartes(!isOpenPartes);
  };

  const toggleClientes = () => {
    setIsOpenClientes(!isOpenClientes);
  };

  const toggleDirecionadores = () => {
    setIsOpenDirecionadores(!isOpenDirecionadores);
  };

  const toggleEntradas = () => {
    setIsOpenEntradas(!isOpenEntradas);
  };

  const toggleSaidas = () =>{
    setIsOpenSaidas(!isOpenSaidas)
  }

  const handleFerramentas = (ferr) => {
    setFerramentas([...ferramentas, ferr]);
  };

  const handlePartes = (part) => {
    setPartes([...partes, part]);
  };

  const handleClientes = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const handleDirecionadores = (dir) => {
    setDirecionadores([...direcionadores, dir]);
  };

  const handleEntradas = (entrada) => {
    setEntradas([...entradas, entrada]);
  };

  const handleSaidas = (saida) =>{
    setSaidas([...saidas, saida]);
  }

  const handleDelFerramentas = async (id) => {
    try {
      let arr = [];
      await api.delete(`ferramentas/${id}/`);
      arr = ferramentas.filter((ferr) => ferr.id !== id);
      setFerramentas(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar ferramentas/materiais");
    }
  };

  const handleDelPartes = async (id) => {
    try {
      let arr = [];
      await api.delete(`partes/${id}/`);
      arr = partes.filter((part) => part.id !== id);
      setPartes(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a parte");
    }
  };

  const handleDelCliente = async (id) => {
    try {
      let arr = [];
      await api.delete(`clientes/${id}/`);
      arr = clientes.filter((part) => part.id !== id);
      setClientes(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o cliente");
    }
  };

  const handleDelDirecionadores = async (id) => {
    try {
      let arr = [];
      await api.delete(`direcionadores/${id}/`);
      arr = direcionadores.filter((dir) => dir.id !== id);
      setDirecionadores(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o direcionador");
    }
  };

  const handleDelEntradas = async (id) => {
    try {
      let arr = [];
      await api.delete(`entradas/${id}/`)
      arr = entradas.filter((entrada) => entrada.id !== id)
      setEntradas(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a entrada");
    }
  };

  const handleDelSaidas = async (id) => {
    try {
      let arr = [];
      await api.delete(`saidas/${id}/`)
      arr = saidas.filter((saida) => saida.id !== id)
      setSaidas(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a saída");
    }
  };

  return (
    <>
      <Content title="Processo" action="Cadastro">
        <CadastroMaterial
          isOpen={isOpenFerramentas}
          toggle={toggleFerramentas}
          append={handleFerramentas}
        />

        <CadastroPartes
          isOpen={isOpenPartes}
          toggle={togglePartes}
          append={handlePartes}
        />

        <CadastroCliente
          isOpen={isOpenClientes}
          toggle={toggleClientes}
          append={handleClientes}
        />

        <CadastroDirecionador
          isOpen={isOpenDirecionadores}
          toggle={toggleDirecionadores}
          append={handleDirecionadores}
        />

        <CadastroEntradas
          isOpen={isOpenEntradas}
          toggle={toggleEntradas}
          append={handleEntradas}
        />

        <CadastroSaidas 
          isOpen={isOpenSaidas}
          toggle={toggleSaidas}
          append={handleSaidas}
        />

        <FormModal
          label="Formulário de cadastro"
          color="primary"
          loadingSubmit={isSubmit}
        >
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-3">
                  <label htmlFor="">Nome processo</label>
                  <input
                    type="text"
                    {...register("nome_processo", { required: true })}
                    className={`form-control ${
                      errors.nome_processo ? "error-input" : ""
                    }`}
                    placeholder="Insira o nome do processo"
                  />
                  {errors.nome_processo?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-3">
                  <label htmlFor="">Gestor Principal</label>
                  <input
                    type="text"
                    {...register("gestorPrincipal", { required: true })}
                    className={`form-control ${
                      errors.gestorPrincipal ? "error-input" : ""
                    }`}
                    placeholder="Insira o nome do gestor"
                  />
                  {errors.gestorPrincipal?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-3">
                  <label htmlFor="">Proprietário</label>
                  <input
                    type="text"
                    {...register("proprietario", { required: true })}
                    className={`form-control ${
                      errors.proprietario ? "error-input" : ""
                    }`}
                    placeholder="Insira o proprietário"
                  />
                  {errors.proprietario?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-3">
                  <label htmlFor="">Fronteira (de)</label>
                  <input
                    type="text"
                    {...register("fronteiraDe", { required: true })}
                    className={`form-control ${
                      errors.fronteiraDe ? "error-input" : ""
                    }`}
                  />
                  {errors.fronteiraDe?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-3">
                  <label htmlFor="">Fronteira (até)</label>
                  <input
                    type="text"
                    {...register("fronteiraAte", { required: true })}
                    className={`form-control ${
                      errors.fronteiraAte ? "error-input" : ""
                    }`}
                  />
                  {errors.fronteiraAte?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-3">
                  <label htmlFor="">Objetivo</label>
                  <input
                    type="text"
                    {...register("objetivo", { required: true })}
                    className={`form-control ${
                      errors.objetivo ? "error-input" : ""
                    }`}
                    placeholder="Insira o objetivo"
                  />
                  {errors.objetivo?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-3">
                  <label htmlFor="">Código</label>
                  <Controller
                    control={control}
                    name="codigo"
                    rules={{ required: true, minLength: 5 }}
                    render={({ field }) => (
                      <InputMask
                        className={`form-control ${
                          errors.codigo ? "error-input" : ""
                        }`}
                        maskChar=""
                        mask="9.9.9"
                        placeholder="9.9.9"
                        {...field}
                      />
                    )}
                  />
                  {errors.codigo?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                  {errors.codigo?.type === "minLength" && (
                    <span className="help-block">O tamanho mínimo é de 3</span>
                  )}
                </div>
                <div className="col-xs-3">
                  <label htmlFor="">Proad</label>
                  <input
                    type="text"
                    {...register("proad", { required: true, maxLength: 12 })}
                    className={`form-control ${
                      errors.proad ? "error-input" : ""
                    }`}
                    placeholder="Insira o proad"
                  />
                  {errors.proad?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                  {errors.proad?.type === "maxLength" && (
                    <span className="help-block">Tamanho máximo é 12</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <label htmlFor="">Versão do processo</label>
                  <input
                    type="number"
                    {...register("versaop", { required: true, maxLength: 12 })}
                    className={`form-control ${
                      errors.versaop ? "error-input" : ""
                    }`}
                    placeholder="Insira a versão do processo"
                  />
                  {errors.versaop?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-6">
                  <label htmlFor="">Macroprocesso primário</label>
                  <select
                    name=""
                    id=""
                    className={`form-control ${
                      errors.macroProcesso_primario ? "error-input" : ""
                    }`}
                    {...register("macroProcesso_primario", { required: true })}
                  >
                    <option value="" defaultValue>
                      Selecione um macroprocesso
                    </option>
                    {macroprocessos.map((macro) => (
                      <option value={macro.id}>
                        {macro.nome_macroprocesso}
                      </option>
                    ))}
                  </select>
                  <LinkCadastro path={"/cadastroMacroprocesso"} />
                  {errors.macroProcesso_primario?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-4">
                  <div className="div-multiselect">
                    <label htmlFor="">Partes interessadas</label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={togglePartes}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="local-items">
                    {partes.map((part) => (
                      <div className="items" key={part.id}>
                        {part.nomeParte}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelPartes(part.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="div-multiselect">
                    <label htmlFor="">Direcionadores</label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={toggleDirecionadores}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="local-items">
                    {direcionadores.map((dir) => (
                      <div className="items" key={dir.id}>
                        {dir.orgao}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelDirecionadores(dir.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="div-multiselect">
                    <label htmlFor="">Ferramentas/materiais</label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={toggleFerramentas}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="local-items">
                    {ferramentas.map((ferr) => (
                      <div className="items" key={ferr.id}>
                        {ferr.descricao}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelFerramentas(ferr.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-8">
                  <label htmlFor="">Etapas/Atividades</label>
                  <textarea
                    rows="5"
                    className={`form-control multiselect ${
                      errors.etapas ? "error-input" : ""
                    }`}
                    {...register("etapas", { required: true })}
                    placeholder="Principais etapas (ou macroatividades) executadas pelo processo com vistas a transformar as entradas (insumos) em serviços/produtos (saídas)"
                  ></textarea>
                  {errors.etapas?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-4">
                  <div className="div-multiselect">
                    <label>Clientes</label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={toggleClientes}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="local-items">
                    {clientes.map((cliente) => (
                      <div className="items" key={cliente.id}>
                        {cliente.nome}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelCliente(cliente.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <div className="div-multiselect">
                    <label>Entradas</label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={toggleEntradas}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="local-items">
                    {entradas.map((ent) => (
                      <div className="items" key={ent.id}>
                        {ent.descricao}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelEntradas(ent.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="div-multiselect">
                    <label>Saídas</label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={toggleSaidas}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="local-items">
                    {saidas.map((saida) => (
                      <div className="items" key={saida.id}>
                        {saida.descricao}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelSaidas(saida.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <FormButton label="Cadastrar" color="success" />
          </form>
        </FormModal>
      </Content>
    </>
  );
};

export default CadastroProcesso;
