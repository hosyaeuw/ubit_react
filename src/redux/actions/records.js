import axios from "axios"

export const Types = {
    SET_RECORDS: 'NEWS@SET_RECORDS'
}

export const fetchGetRecords = () => (dispatch) => {
    axios.get('/api/records/get_all').then((data) => dispatch(setRecords((data.data))))
}

export const setRecords = (items) => ({
    type: Types.SET_RECORDS,
    payload: items
})