import axios from "axios"

export const Types = {
    SET_LESSONTIMES: 'LessonTimes@SET_LESSONTIMES',
    DELETE_LESSONTIMES: 'LessonTimes@DELETE_LESSONTIMES',
}

export const fetchGetLessonTimes = () => (dispatch) => {
    axios.get('/api/lesson_times/get_all').then((data) => dispatch(setLessonTimes((data.data))))
}

export const fetchDeleteLessonTimes = (id) => (dispatch) => {
    axios.delete(`/api/lesson_times/delete/${id}`).then(({ data }) => dispatch(deleteLessonTimes(+data.result)))
}

export const setLessonTimes = (items) => ({
    type: Types.SET_LESSONTIMES,
    payload: items
})

export const deleteLessonTimes = (id) => ({
    type: Types.DELETE_LESSONTIMES,
    payload: id
})