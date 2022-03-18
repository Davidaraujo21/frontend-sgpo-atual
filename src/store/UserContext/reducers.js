import {LOGIN, LOGOUT} from './types'

const INITIAL_STATE = {
    username: "",
    tipo_usuario: 0
}

export const reducers = (state, action) =>{
    switch (action.type) {
        case LOGIN:
            const {username, tipo_usuario} = action.payload;
            return {...state, username, tipo_usuario}
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state
    }
}
