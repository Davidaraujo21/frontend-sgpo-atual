import React, { useState, useEffect } from "react";
import Content from "../../common/template/content/content";
import FormModal from "../../common/template/form/form";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LinkCadastro from "../../common/template/form/linkCadastro";

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
  const [clientes, setClientes] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      const processo_obj = {
        ...data,
      };
      await api.post("processos/", processo_obj);
      reset({ codigo: "" });
      toast.success("Processo cadastrado com sucesso");
      setIsSubmit(false);
    } catch (err) {
      toast.error("Ocorreu um erro ao cadastrar processo");
      setIsSubmit(false);
    }
  };

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

  return (
    <>
      <Content title="Processo" action="Cadastro">
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
                  <LinkCadastro path={"/cadastroMacroprocesso"}/>
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
                    {partes.map((partes) => (
                      <option value={partes.id}>{partes.nomeParte}</option>
                    ))}
                  </select>
                  <LinkCadastro path={"/cadastroParte"}/>
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
                    {direcionadores.map((dir) => (
                      <option value={dir.id}>{dir.orgao}</option>
                    ))}
                  </select>
                  <LinkCadastro path={"/cadastroDirecionador"}/>
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
                    {ferramentas.map((fer) => (
                      <option value={fer.id}>{fer.descricao}</option>
                    ))}
                  </select>
                  <LinkCadastro path={"/cadastroFerramentaMaterial"}/>
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
                    {clientes.map((cliente) => (
                      <option value={cliente.id}>{cliente.nome}</option>
                    ))}
                  </select>
                  <LinkCadastro path={"/cadastroCliente"}/>
                  {errors.clientes?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group local-btn">
              <button className="btn btn-success" type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        </FormModal>
      </Content>
    </>
  );
};

export default CadastroProcesso;
