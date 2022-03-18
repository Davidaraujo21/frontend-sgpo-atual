import {LOGIN, LOGOUT} from './types'

export const loginDataUser = (dispatch, dataUser) =>{
    dispatch({type: LOGIN, payload: dataUser})
}

export const logoutDataUser = (dispatch, dataUser) =>{
    dispatch({type: LOGOUT, payload: dataUser})
}