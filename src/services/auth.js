import jwt_decode from "jwt-decode";

export function checkAuth() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    const { exp } = decodeJwt(refreshToken);
    if (Date.now() >= exp * 1000) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function getDataUser() {
  const username = localStorage.getItem("username");
  const tipo_usuario = localStorage.getItem("tipo_usuario");
  return { username, tipo_usuario };
}

export async function login({ access, refresh, username, tipo_usuario }) {
  localStorage.setItem("token", access);
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("username", username);
  localStorage.setItem("tipo_usuario", tipo_usuario);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
  localStorage.removeItem("tipo_usuario");
}

export function decodeJwt(jwt) {
  return jwt_decode(jwt);
}
