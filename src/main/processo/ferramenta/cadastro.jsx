import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Modal from "../../../common/template/modal/modal";

const CadastroMaterial = ({isOpen, toggle, append}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dataObj) => {
    (async function () {
      try {
        const {data} = await api.post("ferramentas/", dataObj);
        append(data)
        reset()
        toggle()
        toast.success("Ferramenta/materiais cadastro com sucesso");
      } catch (err) {
        toast.success("Ocorreu um erro ao cadastrar ferramenta/materiais");
      }
    })();
  };

  const footerButtons = () => {
    return (
      <>
        <button className="btn btn-secondary" onClick={toggle}>Fechar</button>
      </>
    );
  };

  return (
    <>
      <Modal
        title="Ferramentas/Materiais"
        isOpen={isOpen}
        footerButtons={footerButtons()}
      >
        <FormModal label="Formulário de cadastro" color="primary">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Descrição</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.descricao ? "error-input" : ""
                    }`}
                    placeholder="Informe a descrição da ferramenta ou material"
                    {...register("descricao", { required: true })}
                  />
                  {errors.descricao?.type === "required" && (
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

export default CadastroMaterial;
