import React from "react";
import FormModal from "../../common/template/form/form";
import FormButton from "../../common/template/form/formButton";
import logoImg from "../../assets/logo_sgpo.png";
import "./styles.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { checkAuth, login } from "../../services/auth";
import { Redirect, useHistory } from "react-router-dom";
import api from "../../services/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const submit = async ({ username, password }) => {
    const credentials = {
      username,
      password,
    };
    try {
      const { data } = await api.post("login/", credentials);
      login(data)
      history.push("/")
    } catch (err) {
      toast.error("Usuário ou senha incorretos");
    }
  };

  return checkAuth() ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="local-form-login">
        <FormModal hasImg img={logoImg} color="primary" width={"500px"}>
          <form className="form login" onSubmit={handleSubmit(submit)}>
            <div className="form-group">
              <label htmlFor="">Usuário: </label>
              <input
                className={`form-control ${errors.username ? "error-input" : ""}`}
                type="text"
                placeholder="Informe o usuário"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="">Senha: </label>
              <input
                className={`form-control ${
                  errors.password ? "error-input" : ""
                }`}
                type="password"
                placeholder="Informe a senha"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <span className="help-block">Campo obrigatório</span>
              )}
            </div>
            <FormButton label="Acessar" color="primary" />
          </form>
        </FormModal>
      </div>
    </>
  );
};

export default Login;
