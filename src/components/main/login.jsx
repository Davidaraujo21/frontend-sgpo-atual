import React from "react";
import { Button } from "reactstrap";
import { login, checkAuth } from '../../services/auth'
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Redirect, useHistory } from 'react-router-dom'
import './login.css'
import { Jumbotron, Container } from "react-bootstrap";
import api from '../../services/api'

const LoginForm = () => {

    const history = useHistory()

    const submit = async (e) =>{
      e.preventDefault()
      const target = e.target
      const obj = {
        username: target["username"].value,
        password: target["password"].value
      }
      try{
        const get_data = await api.post("api/login/", obj)
        login(get_data.data)
        history.push("/")
      }catch(err){
        console.log("Credenciais inválidas")
      }
    }

    return (
      <>
      { checkAuth() 
        ?
        <Redirect to="/" />
        :
      <Container style={{height: "100vh"}} className="d-flex w-100 align-items-center justify-content-center">
        <Jumbotron className="login text-center">
            <h3>SGPO - LOGIN</h3>
            <hr className="linhatitulologin"/>
      <AvForm onSubmit={(e) => submit(e)}>
        <AvField
        className="campoescrita"
          name="username"
          label="Usuário"
          type="text"
          placeholder="Inserir o usuário..."        
        />
        <AvField
          name="password"
          label="Password"
          type="password"
          placeholder="Inserir a senha..."
          required
        />
        <Button id="submit">Acessar</Button>
      </AvForm>
      </Jumbotron>
      </Container>
      }
      </>
    );
}

export default LoginForm