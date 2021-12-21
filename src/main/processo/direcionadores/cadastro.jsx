import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import { toast } from "react-toastify";
import api from "../../../services/api";
import Modal from "../../../common/template/modal/modal";

const CadastroDirecionador = ({ isOpen, toggle, append }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dataObj) => {
    (async function () {
      try {
        const { data } = await api.post("direcionadores/", dataObj);
        append(data);
        reset();
        toggle();
        toast.success("Direcionador cadastrado com sucesso");
      } catch (err) {
        toast.error("Ocorreu um erro ao cadastrar direcionador");
      }
    })();
  };

  
  const footerButtons = () => {
    return (
      <>
        <button className="btn btn-secondary" onClick={toggle}>
          Fechar
        </button>
      </>
    );
  };

  return (
    <>
      <Modal title="Direcionador" isOpen={isOpen} toggle={toggle} footerButtons={footerButtons()}>
        <FormModal label="Formulário de cadastro" color="warning">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form direcionadores"
          >
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <label htmlFor="">Órgão</label>
                  <input
                    type="text"
                    placeholder="Insira o órgão"
                    className={`form-control ${
                      errors.orgao ? "error-input" : ""
                    }`}
                    {...register("orgao", { required: true })}
                  />
                  {errors.orgao?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-6">
                  <label htmlFor="">
                    Número da(lei, resolução, normativos, etc)
                  </label>
                  <input
                    type="text"
                    placeholder="Insira o número"
                    className={`form-control ${
                      errors.numero ? "error-input" : ""
                    }`}
                    {...register("numero", { required: true })}
                  />
                  {errors.numero?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-4">
                  <label htmlFor="">Data</label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.data ? "error-input" : ""
                    }`}
                    {...register("data", { required: true })}
                  />
                  {errors.data?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-4">
                  <label htmlFor="">Url</label>
                  <input
                    type="text"
                    placeholder="Insira a url para consulta"
                    className={`form-control ${
                      errors.url ? "error-input" : ""
                    }`}
                    {...register("url")}
                  />
                  {errors.url?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
                <div className="col-xs-4">
                  <label htmlFor="">Tipo</label>
                  <select
                    name=""
                    id=""
                    className={`form-control ${
                      errors.tipoParte ? "error-input" : ""
                    }`}
                    {...register("tipoParte", { required: true })}
                  >
                    <option value="" defaultValue>
                      Selecione um tipo
                    </option>
                    <option value="L">Lei</option>
                    <option value="D">Decreto</option>
                    <option value="R">Resolução</option>
                    <option value="A">Ato</option>
                    <option value="Po">Portaria</option>
                    <option value="M">Manual</option>
                  </select>
                  {errors.tipo?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Descrição</label>
                  <textarea
                    cols="30"
                    rows="4"
                    placeholder="Insira a descrição"
                    className={`form-control`}
                    {...register("descricao")}
                  ></textarea>
                </div>
              </div>
            </div>
            <FormButton label="Cadastar" color="success" />
          </form>
        </FormModal>
      </Modal>
    </>
  );
};

export default CadastroDirecionador;
