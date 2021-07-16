import axios from "axios"

export const Types = {
    SET_LESSONS: 'LESSON@SET_LESSON',
    DELETE_LESSON: 'LESSON@DELETE_LESSON',
}

export const fetchGetLessons = () => (dispatch) => {
    axios.get('/api/lessons/get_all').then((data) => dispatch(setLessons((data.data))))
}

export const fetchDeleteLesson = (id) => (dispatch) => {
    axios.delete(`/api/lessons/delete/${id}`).then(({ data }) => dispatch(deleteLesson(+data.result)))
}

export const setLessons = (items) => ({
    type: Types.SET_LESSONS,
    payload: items
})

export const deleteLesson = (id) => ({
    type: Types.DELETE_LESSON,
    payload: id
})