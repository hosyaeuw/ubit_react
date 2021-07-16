import axios from "axios"

export const Types = {
    SET_TIMETABLE: 'TIMETABLE@SET_TIMETABLE',
    SET_BUILD_TIMETABLE: 'TIMETABLE@SET_BUILD_TIMETABLE',
    SET_LOADED: 'TIMETABLE@SET_LOADED',
    DELETE_TIMETABLE: 'TIMETABLE@DELETE_TIMETABLE',
}

export const fetchGetBuildedTimetable = () => (dispatch) => {
    axios.get('/api/groups/get_all').then(({ data }) => {
        dispatch(setBuildTimetable((data)))
        dispatch(setLoaded(true))
    })
}

export const fetchGetTimetable = () => (dispatch) => {
    axios.get('/api/timetable/get_all').then(({ data }) => {
        dispatch(setTimetable((data)))
    })
}

export const fetchDeleteTimetable = (id) => (dispatch) => {
    axios.delete(`/api/timetable/delete/${id}`).then(() => {
        dispatch(deleteTimetable(id))
    })

}

export const setTimetable = (items) => ({
    type: Types.SET_TIMETABLE,
    payload: items
})

export const setBuildTimetable = (items) => ({
    type: Types.SET_BUILD_TIMETABLE,
    payload: items
})

export const setLoaded = (item) => ({
    type: Types.SET_LOADED,
    payload: item
})

export const deleteTimetable = (item) => ({
    type: Types.DELETE_TIMETABLE,
    payload: item
})