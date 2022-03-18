import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Modal from "../../../common/template/modal/modal";

const CadastroPartes = ({ isOpen, toggle, append }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dataObj) => {
    (async function () {
      try {
        const { data } = await api.post("partes/", dataObj);
        append(data);
        reset();
        toggle();
        toast.success("Parte cadastrada com sucesso");
      } catch (err) {
        toast.error("Ocorreu um erro ao cadastrar a parte");
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
      <Modal title="Partes" isOpen={isOpen} footerButtons={footerButtons()}>
        <FormModal label="Formulário de cadastro" color="primary">
          <form className="form partes" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Nome da parte</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.nomeParte ? "error-input" : ""
                    }`}
                    placeholder="Insira o nome da parte"
                    {...register("nomeParte", { required: true })}
                  />
                  {errors.nomeParte?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <label htmlFor="">Sigla</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.sigla ? "error-input" : ""
                    }`}
                    placeholder="Insira a sigla"
                    {...register("sigla", { required: true, maxLength: 20 })}
                  />
                  {errors.sigla?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                  {errors.sigla?.type === "maxLength" && (
                    <span className="help-block">Tamanho máximo é 20</span>
                  )}
                </div>
                <div className="col-xs-6">
                  <label htmlFor="">Tipo da parte</label>
                  <select
                    className={`form-control ${
                      errors.tipoParte ? "error-input" : ""
                    }`}
                    {...register("tipoParte", { required: true })}
                  >
                    <option value="" defaultValue>
                      Selecione uma tipo
                    </option>
                    <option value="Pe">Pessoa</option>
                    <option value="C">Cargo</option>
                    <option value="U">Unidade</option>
                    <option value="S">Setor</option>
                    <option value="O">Órgão</option>
                    <option value="C">Comitê</option>
                    <option value="Pa">Papel</option>
                    <option value="G">Grupo</option>
                  </select>
                </div>
              </div>
            </div>
            <FormButton label="Cadastrar" color="success" />
          </form>
        </FormModal>
      </Modal>
    </>
  );
};

export default CadastroPartes;
