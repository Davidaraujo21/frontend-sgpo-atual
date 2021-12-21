import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Modal from "../../../common/template/modal/modal";

const CadastroSaidas = ({ isOpen, toggle, append }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dataObj) => {
    (async function () {
      try {
        const {data} = await api.post("saidas/", dataObj);
        append(data);
        reset();
        toggle();
        toast.success("Saídas cadastradas com sucesso");
      } catch (err) {
        toast.error("Ocorreu um erro ao cadastrar saídas");
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
      <Modal
        title="Saidas"
        isOpen={isOpen}
        footerButtons={footerButtons()}
      >
        <FormModal label="Formulário de cadastro" color="warning">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("descricao", { required: true })}
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
      </Modal>
    </>
  );
};

export default CadastroSaidas;
