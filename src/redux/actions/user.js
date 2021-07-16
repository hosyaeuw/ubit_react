import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { addPlate } from './plates'

export const Types = {
    SET_TOKEN: 'USER@SET_TOKEN',
    SET_USER: 'USER@SET_USER',
}

export const auth = (req_data) => (dispatch) => {
    axios.post('/auth', req_data).then(({ data }) => {
        dispatch(setToken(data['access_token']))
        dispatch(setUser(data['user']))
    }).catch((error) => {
        dispatch(addPlate({ value: 'Ошибка авторизации. Попробуйте ещё раз', type: 'error' }))
    })
}

export const exit = () => (dispatch) => {
    console.log('тут')
    // reactLocalStorage.set('token', 'no');
    // reactLocalStorage.set('user', 'no');
    reactLocalStorage.clear()
    dispatch(setUser(null))
    dispatch(setToken(null))
}

export const setToken = (token) => {
    if (!!token) {
        reactLocalStorage.set('token', token)
    }
    return {
        type: Types.SET_TOKEN,
        payload: token
    }
}

export const setUser = (items) => {
    if (!!items) {
        reactLocalStorage.setObject('user', items)
    }
    return {
        type: Types.SET_USER,
        payload: items
    }
}


export const checkRoles = (roles, roleCheck) => !!roles ? roles.includes(roleCheck) : null
