import React, { useEffect, useState, useCallback } from "react";
import Content from "../../common/template/content/content";
import FormModal from "../../common/template/form/form";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import MenuActions from "../../common/template/menuActions/menuActions";
import FormButton from "../../common/template/form/formButton";
import ConfirmModal from "../../common/template/modal/confirmModal";

const MacroprocessoDetalhes = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const [isReadOnly, setIsReadOnly] = useState(true);
  const { id } = useParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [componente, setComponente] = useState();
  const [componentes, setComponentes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async function () {
      try {
        const dadosMacroprocesso = api.get(`macroprocessos/${id}/`);
        const dadosComponentePrimario = api.get("componentes/");

        const [macroprocesso, componentePrimario] = await Promise.all([
          dadosMacroprocesso,
          dadosComponentePrimario,
        ]);

        const { nome_macroprocesso, objetivo, codigo, componente_primario } =
          await macroprocesso.data;

        setValue("nome_macroprocesso", nome_macroprocesso);
        setValue("objetivo", objetivo);
        setValue("codigo", codigo);
        setComponente(componente_primario);
        setComponentes(componentePrimario.data);
      } catch (err) {
        toast.error("Ocorreu um erro ao obter os dados do macroprocesso");
      }
    })();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      await api.patch(`macroprocessos/${id}/`, data);
      toast.success("Macroprocesso alterado com sucesso");
      setIsReadOnly(true);
      setIsSubmit(false);
    } catch (err) {
      setIsSubmit(false);
      toast.error("Ocorreu um erro ao alterar o macroprocesso");
    }
  };

  const toggleIsReadOnly = useCallback(() => {
    setIsReadOnly(!isReadOnly);
    clearErrors();
  }, [isReadOnly, clearErrors]);

  const onDelete = useCallback(async () => {
    try {
      await api.delete(`macroprocessos/${id}/`);
      toast.success("Macroprocesso excluído com sucesso");
      history.push("/listaMacroprocessos");
    } catch (err) {
      toast.success("Ocorreu um erro ao excluir o macroprocesso");
    }
  }, [id, history]);

  const toggleDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  return (
    <>
      <Content title="Macroprocesso" action="detalhes">
        <ConfirmModal
          title={
            "Ao excluir um macroprocesso os processos vinculados a ele serão excluídos. Confirmar exclusão do macroprocesso?"
          }
          isOpen={isDelete}
          toggle={toggleDeleteModal}
          action={onDelete}
        />
        <FormModal
          label="Detalhes do macroprocesso"
          color="info"
          loadingSubmit={isSubmit}
          actions={
            <MenuActions
              isEdit
              isDelete
              toggleIsReadOnly={toggleIsReadOnly}
              onDelete={toggleDeleteModal}
            />
          }
        >
          <form
            className="form macroprocesso"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label htmlFor="">Nome macroprocesso</label>
              <input
                disabled={isReadOnly}
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
                  <label className="form-label">Componente primário</label>
                  <select
                    disabled={isReadOnly}
                    className={`form-control ${
                      errors.componente_primario ? "error-input" : ""
                    }`}
                    {...register("componente_primario")}
                  >
                    <option selected value={componente?.id}>
                      {componente?.nome_componente}
                    </option>
                    {componentes.map(
                      (comp) =>
                        comp.id !== componente?.id && (
                          <option value={comp.id}>
                            {comp.nome_componente}
                          </option>
                        )
                    )}
                  </select>
                  {errors.componente_primario?.type === "required" && (
                    <span className="help-block">Campo obrigatório</span>
                  )}
                </div>
              </div>
            </div>
            <FormButton
              label="Alterar"
              color="success"
              isReadOnly={isReadOnly}
            />
          </form>
        </FormModal>
      </Content>
    </>
  );
};

export default MacroprocessoDetalhes;
