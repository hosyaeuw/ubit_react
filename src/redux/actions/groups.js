import axios from "axios"

export const Types = {
    SET_GROUPS: 'GROUPS@SET_GROUPS',
    DELETE_GROUP: 'GROUPS@DELETE_GROUP',
}

export const fetchGetGroups = () => (dispatch) => {
    axios.get('/api/groups/get_all').then((data) => dispatch(setGroups((data.data))))
}

export const fetchDeleteGroup = (id) => (dispatch) => {
    axios.delete(`/api/groups/delete/${id}`).then(dispatch(deleteGroup(id)))
}

export const setGroups = (items) => ({
    type: Types.SET_GROUPS,
    payload: items
})

export const deleteGroup = (id) => ({
    type: Types.DELETE_GROUP,
    payload: id
})