import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";

const CadastroEntradaSaida = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    (async function () {
      try {
        const entradaObj = {
            descricao: data.descricaoEntrada
        }
        const saidaObj = {
            descricao: data.descricaoSaida,
            tipoSaida: data.tipoSaida
        }
        await api.post("entradas/", entradaObj)
        await api.post("saidas/", saidaObj)
        reset()
        toast.success("Entradas/Saídas cadastrado com sucesso")
      } catch (err) {
        toast.error("Ocorreu um erro ao cadastrar Entradas/Saídas")
      }
    })();
  };

  return (
    <>
      <Content title="Entradas/Saidas" action="Cadastro">
        <FormModal label="Formulário de cadastro" color="warning">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Descrição Entrada</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.descricaoEntrada ? "error-input" : ""
                    }`}
                    placeholder="Informe a descrição da entrada"
                    {...register("descricaoEntrada", { required: true })}
                  />
                  {errors.descricaoEntrada?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <label htmlFor="">Descrição Saída</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.descricaoSaida ? "error-input" : ""
                    }`}
                    placeholder="Informe a descrição da saída"
                    {...register("descricaoSaida", { required: true })}
                  />
                  {errors.descricaoSaida?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-6">
                  <label htmlFor="">Tipo saída</label>
                  <select
                    className={`form-control ${
                      errors.tipoSaida ? "error-input" : ""
                    }`}
                    {...register("tipoSaida", { required: true })}
                  >
                    <option value="">Selecione um tipo...</option>
                    <option value="Produto">Produto</option>
                    <option value="Serviço">Serviço</option>
                  </select>
                  {errors.tipoSaida?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
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

export default CadastroEntradaSaida;
