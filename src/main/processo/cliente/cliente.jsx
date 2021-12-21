import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Modal from "../../../common/template/modal/modal";

const CadastroCliente = ({ isOpen, toggle, append }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataObj) => {
    try {
      const {data} = await api.post("clientes/", dataObj);
      append(data)
      reset();
      toggle()
      toast.success("Cliente cadastrado com sucesso");
    } catch (err) {
      toast.error("Ocorreu um erro ao cadastrar cliente");
    }
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
      <Modal title="Clientes" isOpen={isOpen} footerButtons={footerButtons()}>
        <FormModal label="Formulário de cadastro" color="warning">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Nome cliente</label>
                  <input
                    placeholder="Insira o nome do cliente"
                    type="text"
                    className={`form-control ${
                      errors.nome ? "error-input" : ""
                    }`}
                    {...register("nome", { required: true })}
                  />
                  {errors.nome?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Tipo cliente</label>
                  <select
                    name=""
                    id=""
                    className={`form-control ${
                      errors.tipoCliente ? "error-input" : ""
                    }`}
                    {...register("tipoCliente", { required: true })}
                  >
                    <option value="">Selecione um tipo...</option>
                    <option value="Pessoa">Pessoa</option>
                    <option value="Unidade">Unidade</option>
                  </select>
                  {errors.tipoCliente?.type === "required" && (
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

export default CadastroCliente;
