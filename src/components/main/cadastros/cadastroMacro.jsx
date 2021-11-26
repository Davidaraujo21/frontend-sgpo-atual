import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import api from "../../../services/api";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const CadastroMacroprocesso = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [componentes, setComponentes] = useState([]);

  const onSubmit = async (data) => {
    try {
      const obj = {
        ...data,
        componente_primario: parseInt(data.componente_primario),
        componentes_vinculados: []
      }
      await api.post("macroprocessos/", obj);
      reset({ codigo: "" });
      toast.success("Macroprocesso cadastrado com sucesso");
    } catch (err) {
      toast.error("Ocorreu um erro ao cadastrar o macroprocesso");
    }
  };

  useEffect(() =>{
      (async function(){
        try{    
            const {data} = await api.get("componentes/") 
            setComponentes(data);
        }catch(err){
            toast.error("Ocorreu um erro no servidor")
        }
      })();
  }, [])

  return (
    <>
      <div className="d-flex bg-primary justify-content-xs-center mt-2">
        <span className="text-light text-center lead align-middle p-2">
          Informe os dados do macroprocesso e cadastre-o no sistema
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center p-4">
        <div className="p-2 form-style pt-3 pb-3 mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="text-center mb-4">Cadastrar Macroprocesso</h4>
                <div className="mb-3">
                  <label className="form-label">Nome macroprocesso</label>
                  <input
                    placeholder="Insira o nome do macroprocesso"
                    type="text"
                    {...register("nome_macroprocesso", { required: true })}
                    className={`form-control ${
                      errors.nome_macroprocesso ? "danger-border" : ""
                    }`}
                  />
                  {errors.nome_macroprocesso?.type === "required" && (
                    <span>Esse campo é requerido</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Insira o objetivo</label>
                  <input
                    placeholder="Insira o objetivo"
                    type="text"
                    {...register("objetivo", { required: true })}
                    className={`form-control ${
                      errors.objetivo ? "danger-border" : ""
                    }`}
                  />
                  {errors.objetivo?.type === "required" && (
                    <span>Esse campo é requerido</span>
                  )}
                </div>
                <div className="mb-5 row">
                  <div className="col-md-6 cod">
                    <label className="form-label">Código</label>
                    <Controller
                      control={control}
                      name="codigo"
                      rules={{ required: true, minLength: 5 }}
                      render={({ field }) => (
                        <InputMask
                          className={`form-control ${
                            errors.codigo ? "danger-border" : ""
                          }`}
                          maskChar=""
                          mask="9.9.9"
                          placeholder="9.9.9"
                          {...field}
                        />
                      )}
                    />
                    {errors.codigo?.type === "required" && (
                      <span>Esse campo é requerido</span>
                    )}
                    {errors.codigo?.type === "minLength" && (
                      <span>O tamanho mínimo é de 3</span>
                    )}
                  </div>
                  <div className="col-md-6 tipo">
                    <label className="form-label">Componente primário</label>
                    <select
                      className={`form-control ${
                        errors.componente_primario ? "danger-border" : ""
                      }`}
                      name="componente_primario"
                      {...register("componente_primario", { required: true })}
                    >
                      <option defaultValue value="">
                        Escolha um componente...
                      </option>
                      {componentes.map((comp) =>
                        <option value={comp.id}>{comp.nome_componente}</option>
                      )}
                    </select>
                    {errors.componente_primario?.type === "required" && (
                      <span>Esse campo é requerido</span>
                    )}
                  </div>
                </div>
                <div className="d-flex w-100 justify-content-between flex-column flex-md-row flex-xl-row">
                  <button
                    className="btn-sm btn-danger "
                    type="button"
                    onClick={() => reset({ codigo: "" })}
                  >
                    Limpar campos
                  </button>
                  <button className="btn-sm btn-info " type="submit">
                    Cadastrar macroprocesso
                  </button>
                </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastroMacroprocesso;
