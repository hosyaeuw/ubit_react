import axios from "axios"

export const Types = {
    SET_PAYMENTS: 'NEWS@SET_PAYMENTS',
    DELETE_PAYMENTS: 'NEWS@DELETE_PAYMENTS',
}

export const fetchGetPayments = () => (dispatch) => {
    axios.get('/api/payments/get_all').then((data) => dispatch(setPayments((data.data))))
}

export const fetchDeletePayments = (id) => (dispatch) => {
    axios.delete(`/api/payments/delete/${id}`).then(({ data }) => dispatch(deletePayments(+data.result)))
}

export const setPayments = (items) => ({
    type: Types.SET_PAYMENTS,
    payload: items
})

export const deletePayments = (id) => ({
    type: Types.DELETE_PAYMENTS,
    payload: id
})