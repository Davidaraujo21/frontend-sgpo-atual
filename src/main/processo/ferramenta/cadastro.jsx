import React from "react";
import Content from "../../../common/template/content/content";
import FormModal from "../../../common/template/form/form";
import { useForm } from "react-hook-form";
import "./styles.css";
import FormButton from "../../../common/template/form/formButton";
import api from "../../../services/api";
import { toast } from "react-toastify";

const CadastroMaterial = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    (async function(){
        try{
            await api.post("ferramentas/", data)
            reset()
            toast.success("Ferramenta/materiais cadastro com sucesso")
        }catch(err){
            toast.success("Ocorreu um erro ao cadastrar ferramenta/materiais")
        }
    })()
  };

  return (
    <>
      <Content title="Ferramentas/Materiais" action="Cadastro">
        <FormModal label="Formulário de cadastro" color="warning">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Descrição</label>
                  <input
                    type="text"
                    className={`form-control ${errors.descricao ? "error-input" : ""}`}
                    placeholder="Informe a descrição da ferramenta ou material"
                    {...register("descricao", { required: true })}
                  />
                  {errors.descricao?.type === "required" && (
                    <span className="help-box">Campo obrigatório</span>
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

export default CadastroMaterial;
