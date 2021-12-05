import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Content from "../../common/template/content/content";
import api from "../../services/api";
import { useForm, Controller } from "react-hook-form";
import FormModal from "../../common/template/form/form";
import FormButton from "../../common/template/form/formButton";
import InputMask from "react-input-mask";
import MenuActions from "../../common/template/menuActions/menuActions";

const ComponenteDetalhes = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm();

  const [componenteDados, setComponenteDados] = useState()
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`componentes/${id}`);
        setValue("nome_componente", data.nome_componente);
        setValue("objetivo", data.objetivo);
        setValue("codigo", data.codigo);
        setValue("tipo", data.tipo);
        // setComponenteDados(data)
      } catch (err) {
        toast.error("Ocorreu um erro ao carregar dados dos componentes");
      }
    })();
  }, [id]);


  const onSubmit = async(data) =>{
    try{
      await api.patch(`componentes/${id}/`, data)
      toast.success("Componente alterado com sucesso")
      setIsReadOnly(true)
    }catch(err){
      toast.error("Ocorreu um erro ao alterar o componente")
    }
  }

  const toggleIsReadOnly = useCallback(() => {
    setIsReadOnly(!isReadOnly);
    clearErrors()
   }, [isReadOnly, clearErrors])

  return (
    <>
      <Content title="Componentes" action="detalhes">
        <FormModal
          color="info"
          label={"Detalhes do componente"}
          loadingSubmit={false}
          actions={
            <MenuActions isEdit isDelete toggleIsReadOnly={toggleIsReadOnly}/>
          }
        >
          <form className="form componente" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="">Nome componente</label>
              <input
                disabled={isReadOnly}
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
                disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
            <FormButton label="Alterar" color="success" isReadOnly={!isReadOnly}/>
          </form>
        </FormModal>
      </Content>
    </>
  );
};

export default ComponenteDetalhes;
