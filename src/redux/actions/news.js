import axios from "axios"

export const Types = {
    SET_NEWS: 'NEWS@SET_NEWS',
    SET_EVENTS: 'NEWS@SET_EVENTS',
    DELETE_NEWS: 'NEWS@DELETE_NEWS',
}

export const fetchGetNews = () => (dispatch) => {
    axios.get('/api/news/get_all').then((data) => dispatch(setNews((data.data))))
}

export const fetchDeleteNews = (id) => (dispatch) => {
    axios.delete(`/api/news/delete/${id}`).then(({ data }) => dispatch(deleteNews(+data.result)))
}

export const setNews = (items) => ({
    type: Types.SET_NEWS,
    payload: items
})

export const deleteNews = (id) => ({
    type: Types.DELETE_NEWS,
    payload: id
})