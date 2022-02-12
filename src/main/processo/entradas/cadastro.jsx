import React, {useRef} from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Modal from "../../../common/template/modal/modal";

const CadastroEntradas = ({ isOpen, toggle, append }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const entradaForm = useRef(null)

  const onSubmit = (dataObj) => {
    (async function () {
      try {
        const formToSubmit = entradaForm.current
        const form = new FormData(formToSubmit)
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const { data } = await api.post("entradas/", form, config);
        append(data);
        reset();
        toggle();
        toast.success("Entradas/Saídas cadastrado com sucesso");
      } catch (err) {
        toast.error("Ocorreu um erro ao cadastrar Entradas/Saídas");
      }
    })();
  };

  const validarTipoArquivo = (arq) => {
    if (arq[0] !== undefined) {
      if (arq[0].type !== "application/pdf") {
        return false;
      }
    }
    return true;
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
      <Modal title="Entradas" isOpen={isOpen} footerButtons={footerButtons()}>
        <FormModal label="Formulário de cadastro" color="warning">
          <form className="form" onSubmit={handleSubmit(onSubmit)} ref={entradaForm}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Descrição Entrada</label>
                  <input
                    name="descricao"
                    type="text"
                    className={`form-control ${
                      errors.descricao ? "error-input" : ""
                    }`}
                    placeholder="Informe a descrição da entrada"
                    {...register("descricao", { required: true })}
                  />
                  {errors.descricao?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Adicionar arquivo (.pdf)</label>
                  <input
                    name="arquivo"
                    type="file"
                    accept="application/pdf"
                    className={`form-control ${
                      errors.arquivo ? "error-input" : ""
                    }`}
                    {...register("arquivo", {
                      validate: {
                        tipoArquivo: (arq) => validarTipoArquivo(arq),
                      },
                    })}
                  />
                  {errors.arquivo?.type === "tipoArquivo" && (
                    <span className="help-block">Somente arquivos .pdf</span>
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

export default CadastroEntradas;
