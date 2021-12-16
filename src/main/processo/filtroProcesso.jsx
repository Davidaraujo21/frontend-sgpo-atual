import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import MenuFiltro from "../../common/template/menuFiltro/menuFiltro";
import api from "../../services/api";

const FiltroProcesso = ({ handleFiltro }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [macroprocessos, setMacroprocessos] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const macroprocessosResp = await api.get("macroprocessos/");
        setMacroprocessos(macroprocessosResp.data);
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
      <MenuFiltro title={"Processos"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-4">
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
              <div className="col-xs-4">
                <label htmlFor="">Macroprocesso</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  {...register("macroprocesso")}
                >
                  <option value="">Selecione um macroprocesso...</option>
                  {macroprocessos.map((mac) => (
                    <option key={mac.id} value={mac.nome_macroprocesso}>
                      {mac.nome_macroprocesso}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-xs-4">
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

export default FiltroProcesso;
