import React from "react";
import FormModal from "../../common/template/form/form";
import FormButton from "../../common/template/form/formButton";
import logoImg from "../../assets/logo_sgpo.png";
import "./styles.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { checkAuth, login } from "../../services/auth";
import { Redirect, useHistory } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const submit = async ({ user, password }) => {
    const userTest = {
      user: "sgpo",
      password: "1234",
    };
    if (user === userTest.user && password === userTest.password) {
      login("tokenTeste", "refreshTokeTeste");
      history.push("/");
    } else {
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
                className={`form-control ${errors.user ? "error-input" : ""}`}
                type="text"
                placeholder="Informe o usuário"
                {...register("user", { required: true })}
              />
              {errors.user?.type === "required" && (
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
