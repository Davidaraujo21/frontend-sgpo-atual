import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router";
import LinkCadastro from "../../../common/template/form/linkCadastro";
import api from "../../../services/api";
import InputMask from "react-input-mask";
import "./styles.css";
import { toast } from "react-toastify";
import FormButton from "../../../common/template/form/formButton";

const ProcessoDetail = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  const [macroprocessos, setMacroprocessos] = useState([]);
  const [partes, setPartes] = useState([]);
  const [direcionadores, setDirecionadores] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [macroprocesso, setMacroprocesso] = useState();
  const [partesSelectDados, setPartesSelectDados] = useState([]);
  const [direcionadoresSelectDados, setDirecionadoresSelectDados] = useState(
    []
  );
  const [ferramentasSelectDados, setFerramentasSelectDados] = useState([]);
  const [clientesSelectDados, setClientesSelectDados] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`processos/${id}`);
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
        setValue("macroProcesso_primario", macroProcesso_primario.id)
        setValue("parte", parte.map((p) => p.id));
        setValue("direcionador", direcionador.map((d) => d.id));
        setValue("ferramenta", ferramenta.map((f) => f.id));
        setValue("clientes", clientes.map((c) => c.id));

        setMacroprocesso(macroProcesso_primario);
        setPartesSelectDados(parte);
        setFerramentasSelectDados(ferramenta);
        setClientesSelectDados(clientes);
        setDirecionadoresSelectDados(direcionador);
      } catch (err) {
        toast.error("Ocorreu um erro ao obter os dados do macroprocesso");
      }
    })();
  }, [id, setValue]);

  useEffect(() => {
    (async function () {
      try {
        const macroprocessoData = api.get("macroprocessos/");
        const direcionadoresData = api.get("direcionadores/");
        const ferramentasData = api.get("ferramentas/");
        const partesData = api.get("partes/");
        const clientesData = api.get("clientes/");

        const [macroprocessos, direcionadores, ferramentas, partes, clientes] =
          await Promise.all([
            macroprocessoData,
            direcionadoresData,
            ferramentasData,
            partesData,
            clientesData,
          ]);

        setMacroprocessos(macroprocessos.data);
        setDirecionadores(direcionadores.data);
        setFerramentas(ferramentas.data);
        setPartes(partes.data);
        setClientes(clientes.data);
      } catch (err) {
        toast.error("Ocorreu um erro ao carregar dados nos campos");
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.patch(`processos/${id}/`, data);
      toast.success("Processo alterado com sucesso");
      props.toggleIsEdit();
    } catch (err) {
      toast.error("Ocorreu um erro ao alterar o processo");
    }
  };

  return (
    <>
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
              <label htmlFor="">Partes interessadas</label>
              <select
                multiple
                className={`form-control multiselect ${
                  errors.parte ? "error-input" : ""
                }`}
                {...register("parte", { required: true })}
              >
                {partes.map((partes) =>
                  partesSelectDados.find((ps) => ps.id === partes.id) ? (
                    <option selected value={partes.id}>
                      {partes.nomeParte}
                    </option>
                  ) : (
                    <option value={partes.id}>{partes.nomeParte}</option>
                  )
                )}
              </select>
              <LinkCadastro path={"/cadastroParte"} />
              {errors.parte?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
            <div className="col-xs-4">
              <label htmlFor="">Direcionadores</label>
              <select
                multiple
                className={`form-control ${
                  errors.direcionador ? "error-input" : ""
                }`}
                {...register("direcionador", { required: true })}
              >
                {direcionadores.map((dir) =>
                  direcionadoresSelectDados.find((ds) => ds.id === dir.id) ? (
                    <option selected value={dir.id}>
                      {dir.orgao}
                    </option>
                  ) : (
                    <option value={dir.id}>{dir.orgao}</option>
                  )
                )}
              </select>
              <LinkCadastro path={"/cadastroDirecionador"} />
              {errors.direcionador?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
            <div className="col-xs-4">
              <label htmlFor="">Ferramentas/materiais</label>
              <select
                multiple
                className={`form-control ${
                  errors.ferramenta ? "error-input" : ""
                }`}
                {...register("ferramenta", { required: true })}
              >
                {ferramentas.map((fer) =>
                  ferramentasSelectDados.find((fs) => fs.id === fer.id) ? (
                    <option selected value={fer.id}>
                      {fer.descricao}
                    </option>
                  ) : (
                    <option value={fer.id}>{fer.descricao}</option>
                  )
                )}
              </select>
              <LinkCadastro path={"/cadastroFerramentaMaterial"} />
              {errors.ferramenta?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-6">
              <label htmlFor="">Etapas/Atividades</label>
              <textarea
                rows="4"
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
            <div className="col-xs-6">
              <label>Clientes</label>
              <select
                multiple
                className={`form-control multiselect ${
                  errors.clientes ? "error-input" : ""
                }`}
                {...register("clientes", { required: true })}
              >
                {clientes.map((cliente) =>
                  clientesSelectDados.find((cs) => cs.id === cliente.id) ? (
                    <option selected value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ) : (
                    <option value={cliente.id}>{cliente.nome}</option>
                  )
                )}
              </select>
              <LinkCadastro path={"/cadastroCliente"} />
              {errors.clientes?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
          </div>
        </div>
        <FormButton label="Alterar" color="success" />
      </form>
    </>
  );
};

export default ProcessoDetail;
