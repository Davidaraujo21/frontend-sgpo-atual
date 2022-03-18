import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LinkCadastro from "../../../common/template/form/linkCadastro";
import api from "../../../services/api";
import InputMask from "react-input-mask";
import "./styles.css";
import { toast } from "react-toastify";
import FormButton from "../../../common/template/form/formButton";
import CadastroMaterial from "../ferramenta/cadastro";
import CadastroPartes from "../partes/cadastro";
import CadastroCliente from "../cliente/cliente";
import CadastroDirecionador from "../direcionadores/cadastro";
import CadastroEntradas from "../entradas/cadastro";
import CadastroSaidas from "../saidas/cadastro";
import MultiSelect from "../../../common/template/form/formMultiSelect";
import "../styles.css";

const ProcessoDetail = ({ id, toggleIsEdit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [macroprocessos, setMacroprocessos] = useState([]);
  const [partes, setPartes] = useState([]);
  const [direcionadores, setDirecionadores] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [macroprocesso, setMacroprocesso] = useState();
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [isOpenFerramentas, setIsOpenFerramentas] = useState(false);
  const [isOpenPartes, setIsOpenPartes] = useState(false);
  const [isOpenClientes, setIsOpenClientes] = useState(false);
  const [isOpenDirecionadores, setIsOpenDirecionadores] = useState(false);
  const [isOpenEntradas, setIsOpenEntradas] = useState(false);
  const [isOpenSaidas, setIsOpenSaidas] = useState(false);

  const baseUrl = api.defaults.baseURL.replace("/api/", "/")

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`processos/${id}/`);
        const {
          nome_processo,
          gestorPrincipal,
          proprietario,
          fronteiraDe,
          fronteiraAte,
          objetivo,
          codigo,
          proad,
          versaop,
          macroProcesso_primario,
          etapas,
          parte,
          direcionador,
          ferramenta,
          clientes,
          entradas,
          saidas,
        } = data;
        setValue("nome_processo", nome_processo);
        setValue("gestorPrincipal", gestorPrincipal);
        setValue("proprietario", proprietario);
        setValue("fronteiraDe", fronteiraDe);
        setValue("fronteiraAte", fronteiraAte);
        setValue("objetivo", objetivo);
        setValue("codigo", codigo);
        setValue("proad", proad);
        setValue("versaop", versaop);
        setValue("etapas", etapas);
        setMacroprocesso(macroProcesso_primario);
        setPartes(parte);
        setFerramentas(ferramenta);
        setClientes(clientes);
        setDirecionadores(direcionador);
        setEntradas(entradas);
        setSaidas(saidas);
      } catch (err) {
        toast.error("Ocorreu um erro ao obter os dados do macroprocesso");
      }
    })();
  }, [id, setValue]);

  useEffect(() => {
    (async function () {
      try {
        const macroprocessoData = api.get("macroprocessos/");
        const [macroprocessos] = await Promise.all([macroprocessoData]);
        setMacroprocessos(macroprocessos.data);
      } catch (err) {
        toast.error("Ocorreu um erro ao carregar dados nos campos");
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    if (
      ferramentas.length > 0 &&
      partes.length > 0 &&
      clientes.length > 0 &&
      entradas.length > 0 &&
      saidas.length > 0 &&
      direcionadores.length > 0
    ) {
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
        };
        await api.patch(`processos/${id}/`, processo_obj);
        setFerramentas([]);
        setPartes([]);
        setClientes([]);
        setEntradas([]);
        setSaidas([]);
        toast.success("Processo alterado com sucesso");
        toggleIsEdit();
      } catch (err) {
        toast.error("Ocorreu um erro ao alterar o processo");
      }
    } else {
      toast.error("Informe todas as informações necessárias para o processo");
    }
  };

  const toggleFerramentas = () => {
    setIsOpenFerramentas(!isOpenFerramentas);
  };

  const handleFerramentas = (ferr) => {
    setFerramentas([...ferramentas, ferr]);
  };

  const togglePartes = () => {
    setIsOpenPartes(!isOpenPartes);
  };

  const handlePartes = (part) => {
    setPartes([...partes, part]);
  };

  const toggleClientes = () => {
    setIsOpenClientes(!isOpenClientes);
  };

  const handleClientes = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const toggleDirecionadores = () => {
    setIsOpenDirecionadores(!isOpenDirecionadores);
  };

  const handleDirecionadores = (dir) => {
    setDirecionadores([...direcionadores, dir]);
  };

  const toggleEntradas = () => {
    setIsOpenEntradas(!isOpenEntradas);
  };

  const handleEntradas = (entrada) => {
    setEntradas([...entradas, entrada]);
  };

  const toggleSaidas = () => {
    setIsOpenSaidas(!isOpenSaidas);
  };

  const handleSaidas = (saida) => {
    setSaidas([...saidas, saida]);
  };

  const handleDelFerramentas = async (id) => {
    try {
      let arr = [];
      arr = ferramentas.filter((ferr) => ferr.id !== id);
      setFerramentas(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar ferramentas/materiais");
    }
  };

  const handleDelPartes = async (id) => {
    try {
      let arr = [];
      arr = partes.filter((part) => part.id !== id);
      setPartes(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a parte");
    }
  };

  const handleDelCliente = async (id) => {
    try {
      let arr = [];
      arr = clientes.filter((part) => part.id !== id);
      setClientes(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o cliente");
    }
  };

  const handleDelDirecionadores = async (id) => {
    try {
      let arr = [];
      arr = direcionadores.filter((dir) => dir.id !== id);
      setDirecionadores(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o direcionador");
    }
  };

  const handleDelEntradas = async (id) => {
    try {
      let arr = [];
      arr = entradas.filter((entrada) => entrada.id !== id);
      setEntradas(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a entrada");
    }
  };

  const handleDelSaidas = async (id) => {
    try {
      let arr = [];
      arr = saidas.filter((saida) => saida.id !== id);
      setSaidas(arr);
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar a saída");
    }
  };

  return (
    <>
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
                className={`form-control ${errors.proad ? "error-input" : ""}`}
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
                className={`form-control ${
                  errors.macroProcesso_primario ? "error-input" : ""
                }`}
                {...register("macroProcesso_primario")}
              >
                <option selected value={macroprocesso?.id}>
                  {macroprocesso?.nome_macroprocesso}
                </option>
                {macroprocessos.map(
                  (macro) =>
                    macro.id !== macroprocesso?.id && (
                      <option value={macro.id}>
                        {macro.nome_macroprocesso}
                      </option>
                    )
                )}
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
                baseUrl={baseUrl}
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
        <FormButton label="Alterar" color="success" />
      </form>
    </>
  );
};

export default ProcessoDetail;
