import axios from "axios"

export const Types = {
    SET_ALERTS: 'DANCERS@SET_ALERTS',
    DELETE_ALERTS: 'DANCERS@DELETE_ALERTS',
}

export const fetchGetAlerts = () => (dispatch) => {
    axios.get('/api/alerts/get_all').then(({data}) => dispatch(setAlerts((data))))
}

export const fetchDeleteAlerts = (id) => (dispatch) => {
    axios.delete(`/api/alerts/delete/${id}`).then(dispatch(deleteAlerts(id)))
}

export const setAlerts = (items) => ({
    type: Types.SET_ALERTS,
    payload: items
})

export const deleteAlerts = (id) => ({
    type: Types.DELETE_ALERTS,
    payload: id
})