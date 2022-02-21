import jwt_decode from "jwt-decode";

export function checkAuth() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    const { exp } = jwt_decode(refreshToken);
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

export async function login({ access, refresh }) {
  localStorage.setItem("token", access);
  localStorage.setItem("refreshToken", refresh);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}
