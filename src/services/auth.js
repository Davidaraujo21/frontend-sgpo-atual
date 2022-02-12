import api from './api'
import jwt_decode from "jwt-decode"

export function checkAuth(){
    if(getToken()){
        return true
    }else{
        return false
    }
    // if(getToken()){
    //     const {exp} = jwt_decode(getToken())
    //     if(Date.now() >= exp * 1000){
    //         api.post("api/refresh/", {refresh: localStorage.getItem("refreshToken")})
    //             .then(res =>{
    //                 localStorage.setItem("token", res.data.access)
    //                 return true
    //             })
    //             .catch(res =>{
    //                 logout()
    //                 return false
    //             })
    //     }else{
    //         api.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`
    //         return true
    //     }  
    // }else{
    //     console.log("error")
    //     return false
    // }
}

export function getToken(){
    return localStorage.getItem("token")
}

export async function login({access, refresh}){
    localStorage.setItem("token", access)
    localStorage.setItem("refreshToken", refresh)
}

export function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
}

