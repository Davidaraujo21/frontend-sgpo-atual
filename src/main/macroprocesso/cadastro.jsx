import React, { useEffect, useState } from "react";
import Content from "../../common/template/content/content";
import FormModal from "../../common/template/form/form";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { toast } from "react-toastify";
import './styles.css'
import FormButton from "../../common/template/form/formButton";
import { useHistory } from "react-router-dom";
import Layout from "../../common/template/layoutDashboard/layout";

const CadastroMacroprocesso = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [componentes, setComponentes] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false)
  const history = useHistory()

  const onSubmit = async (data) => {
    setIsSubmit(true)
    try {
      const obj = {
        ...data,
        componente_primario: parseInt(data.componente_primario),
        componentes_vinculados: [],
      };
      await api.post("macroprocessos/", obj);
      reset({ codigo: "" });
      toast.success("Macroprocesso cadastrado com sucesso");
      setIsSubmit(false)
      history.push("/listaMacroprocessos")
    } catch (err) {
      toast.error("Ocorreu um erro ao cadastrar o macroprocesso");
      setIsSubmit(false)
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("componentes/");
        setComponentes(data);
      } catch (err) {
        toast.error("Ocorreu um erro ao carregar componentes");
      }
    })();
  }, []);

  return (
    <>
      <Content title="Macroprocesso" action="Cadastro">
        <FormModal label="Formulário de cadastro" color="primary" loadingSubmit={isSubmit}> 
          <form className="form macroprocesso" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="">Nome macroprocesso</label>
              <input
                type="text"
                {...register("nome_macroprocesso", { required: true })}
                className={`form-control ${
                  errors.nome_macroprocesso ? "error-input" : ""
                }`}
                placeholder="Insira o nome do componente"
              />
              {errors.nome_macroprocesso?.type === "required" && (
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
                  <label className="form-label">Componente primário</label>
                  <select
                    className={`form-control ${
                      errors.componente_primario ? "error-input" : ""
                    }`}
                    name="componente_primario"
                    {...register("componente_primario", { required: true })}
                  >
                    <option defaultValue value="">
                      Escolha um componente...
                    </option>
                    {componentes.map((comp) => (
                      <option value={comp.id}>{comp.nome_componente}</option>
                    ))}
                  </select>
                  {errors.componente_primario?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <FormButton label="Cadastrar" color="success"/>
          </form>
        </FormModal>
      </Content>
    </>
  );
};

export default CadastroMacroprocesso;
