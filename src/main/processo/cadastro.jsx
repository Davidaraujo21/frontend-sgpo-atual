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
import CadastroSaidas from "./saidas/cadastro";
import MultiSelect from "../../common/template/form/formMultiSelect";

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
      saidas.length > 0 &&
      direcionadores.length > 0
    ) {
      setIsSubmit(true);
      const ferr = ferramentas.map((ferr) => ferr.id);
      const part = partes.map((part) => part.id);
      const dir = direcionadores.map((dir) => dir.id);
      const client = clientes.map((cliente) => cliente.id);
      const entr = entradas.map((entrada) => entrada.id);
      const said = saidas.map((saida) => saida.id);
      try {
        const processo_obj = {
          ...data,
          ferramenta: ferr,
          parte: part,
          direcionador: dir,
          clientes: client,
          entradas: entr,
          saidas: said,
          statusProcesso: "Em Aberto"
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
        const { data } = await api.get("macroprocessos/");
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

  const toggleSaidas = () => {
    setIsOpenSaidas(!isOpenSaidas);
  };

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

  const handleSaidas = (saida) => {
    setSaidas([...saidas, saida]);
  };

  const handleDelFerramentas = async (id) => {
    try {
      await api.delete(`ferramentas/${id}/`);
      setFerramentas(ferramentas.filter((ferr) => ferr.id !== id));
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar ferramentas/materiais");
    }
  };

  const handleDelPartes = async (id) => {
    try {
      await api.delete(`partes/${id}/`);
      setPartes(partes.filter((part) => part.id !== id));
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a parte");
    }
  };

  const handleDelCliente = async (id) => {
    try {
      await api.delete(`clientes/${id}/`);
      setClientes(clientes.filter((part) => part.id !== id));
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o cliente");
    }
  };

  const handleDelDirecionadores = async (id) => {
    try {
      await api.delete(`direcionadores/${id}/`);
      setDirecionadores(direcionadores.filter((dir) => dir.id !== id));
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o direcionador");
    }
  };

  const handleDelEntradas = async (id) => {
    try {
      await api.delete(`entradas/${id}/`);
      setEntradas(entradas.filter((entrada) => entrada.id !== id));
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a entrada");
    }
  };

  const handleDelSaidas = async (id) => {
    try {
      await api.delete(`saidas/${id}/`);
      setSaidas(saidas.filter((saida) => saida.id !== id));
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
                  <MultiSelect
                    toggle={togglePartes}
                    label={"Partes interessadas"}
                    items={partes}
                    del={(id) => handleDelPartes(id)}
                    descricaoLabel={"nomeParte"}
                  />
                </div>
                <div className="col-xs-4">
                  <MultiSelect
                    toggle={toggleDirecionadores}
                    label={"Direcionadores"}
                    items={direcionadores}
                    del={(id) => handleDelDirecionadores(id)}
                    descricaoLabel={"orgao"}
                  />
                </div>
                <div className="col-xs-4">
                  <MultiSelect
                    toggle={toggleFerramentas}
                    label={"Ferramentas/materiais"}
                    items={ferramentas}
                    del={(id) => handleDelFerramentas(id)}
                    descricaoLabel={"descricao"}
                  />
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
                  <MultiSelect
                    toggle={toggleClientes}
                    label={"Clientes"}
                    items={clientes}
                    del={(id) => handleDelCliente(id)}
                    descricaoLabel={"nome"}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <MultiSelect
                    toggle={toggleEntradas}
                    label={"Entradas"}
                    items={entradas}
                    del={(id) => handleDelEntradas(id)}
                    descricaoLabel={"descricao"}
                  />
                </div>
                <div className="col-xs-6">
                  <MultiSelect
                    toggle={toggleSaidas}
                    label={"Saídas"}
                    items={saidas}
                    del={(id) => handleDelSaidas(id)}
                    descricaoLabel={"descricao"}
                  />
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
