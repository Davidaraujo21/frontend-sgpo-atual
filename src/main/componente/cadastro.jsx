import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { toast } from "react-toastify";
import "./styles.css";
import Content from "../../common/template/content/content";
import FormModal from "../../common/template/form/form";
import FormButton from "../../common/template/form/formButton";
import { useHistory } from "react-router-dom";

const CadastroComponente = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      await api.post("componentes/", data);
      toast.success("Componente cadastrado com sucesso");
      reset({ codigo: "" });
      setIsSubmit(false);
      history.push("/listaComponentes");
    } catch (err) {
      toast.error("Ocorreu um erro ao cadastrar o componente");
      setIsSubmit(false);
    }
  };

  return (
    <>
      <Content title="Componente" action="Cadastro">
        <FormModal
          color="primary"
          label="Formulário de cadastro"
          loadingSubmit={isSubmit}
        >
          <form className="form componente" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="">Nome componente</label>
              <input
                type="text"
                {...register("nome_componente", { required: true })}
                className={`form-control ${
                  errors.nome_componente ? "error-input" : ""
                }`}
                placeholder="Insira o nome do componente"
              />
              {errors.nome_componente?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
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
                <div className="col-xs-6">
                  <label htmlFor="">Tipo componente</label>
                  <select
                    name=""
                    id=""
                    {...register("tipo", { required: true })}
                    className={`form-control ${
                      errors.tipo ? "error-input" : ""
                    }`}
                  >
                    <option value="" defaultValue>
                      Escolha um tipo
                    </option>
                    <option value="finalistico">Finalístico</option>
                    <option value="direcionador">Direcionador</option>
                    <option value="apoio">Apoio</option>
                  </select>
                  {errors.tipo?.type === "required" && (
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

export default CadastroComponente;
