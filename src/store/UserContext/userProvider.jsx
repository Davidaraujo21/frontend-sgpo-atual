import React, { useReducer, useEffect } from "react";
import { userData } from "./userData";
import { reducers } from "./reducers";
import { UserContext } from "./context";
import { getDataUser } from "../../services/auth";
import { LOGIN } from "./types";

const UserProvider = ({ children }) => {
  const [stateUser, userDispatch] = useReducer(reducers, userData);

  useEffect(() => {
    let {username, tipo_usuario} = getDataUser();
    if (username && tipo_usuario) {
      tipo_usuario = +tipo_usuario
      userDispatch({ type: LOGIN, payload: {username, tipo_usuario}});
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ stateUser, userDispatch }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
