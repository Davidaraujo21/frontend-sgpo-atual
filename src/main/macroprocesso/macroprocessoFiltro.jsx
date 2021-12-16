import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import MenuFiltro from "../../common/template/menuFiltro/menuFiltro";
import api from "../../services/api";

const FiltroMacroprocesso = ({ handleFiltro }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [componentes, setComponentes] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const componentesResp = await api.get("componentes/");
        setComponentes(componentesResp.data);
      } catch (err) {
        toast.error("Ocorreu um erro ao obter dados da api");
      }
    })();
  }, []);

  const onSubmit = (data) => {
    handleFiltro(data);
  };

  return (
    <>
      <MenuFiltro title={"Macroprocessos"}>
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
                <label htmlFor="">Componente primário</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  {...register("componente")}
                >
                  <option value="">Selecione um componente...</option>
                  {componentes.map((comp) => (
                    <option key={comp.id} value={comp.nome_componente}>
                      {comp.nome_componente}
                    </option>
                  ))}
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

export default FiltroMacroprocesso;
