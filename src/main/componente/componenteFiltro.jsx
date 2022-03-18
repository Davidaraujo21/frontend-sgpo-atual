import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import MenuFiltro from "../../common/template/menuFiltro/menuFiltro";

const FiltroComponente = ({ handleFiltro }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleFiltro(data);
  };

  return (
    <>
      <MenuFiltro title={"Componentes"}> 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-6">
                <label htmlFor="">Código</label>
                <Controller
                  control={control}
                  name="codigo"
                  rules={{ minLength: 5 }}
                  render={({ field }) => (
                    <InputMask
                      className={`form-control`}
                      maskChar=""
                      mask="9.9.9"
                      placeholder="9.9.9"
                      {...field}
                    />
                  )}
                />
                {errors.codigo?.type === "minLength" && (
                  <span>São necessários 3 caracteres</span>
                )}
              </div>
              <div className="col-xs-6">
                <label htmlFor="">Tipo Componente</label>
                <select
                  className="form-control"
                  {...register("tipo_componente")}
                >
                  <option value="">Selecione um componente...</option>
                  <option value="finalistico">Finalístico</option>
                  <option value="direcionador">Direcionador</option>
                  <option value="apoio">Apoio</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-12 text-right">
                <button className="btn btn-sm btn-primary">Pesquisar</button>
              </div>
            </div>
          </div>
        </form>
      </MenuFiltro>
    </>
  );
};

export default FiltroComponente;
