import axios from "axios"

export const Types = {
    SET_DANCERS: 'DANCERS@SET_DANCERS',
    DELETE_DANCER: 'DANCERS@DELETE_DANCER',
}

export const fetchGetDancers = () => (dispatch) => {
    axios.get('/api/dancers/get_all').then(({data}) => dispatch(setDancers((data))))
}

export const fetchDeleteDancer = (id) => (dispatch) => {
    axios.delete(`/api/dancers/delete/${id}`).then(dispatch(deleteDancer(id)))
}

export const setDancers = (items) => ({
    type: Types.SET_DANCERS,
    payload: items
})

export const deleteDancer = (id) => ({
    type: Types.DELETE_DANCER,
    payload: id
})