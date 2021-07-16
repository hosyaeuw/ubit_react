import axios from "axios"

export const Types = {
    SET_TRAINERS: 'TRAINERS@SET_TRAINERS',
    SET_TRAINER_CARDS: 'TRAINERS@SET_TRAINER_CARDS',
    DELETE_TRAINER: 'TRAINERS@DELETE_TRAINER',
}
// get_cards
export const fetchGetTrainers = () => (dispatch) => {
    axios.get('/api/trainers/get_all').then((data) => dispatch(setTrainers((data.data))))
}

export const fetchGetTrainerCards = () => (dispatch) => {
    axios.get('/api/trainers/get_cards').then((data) => dispatch(setTrainerCards((data.data))))
}

export const fetchDeleteTrainer = (id) => (dispatch) => {
    axios.delete(`/api/trainers/delete/${id}`).then(dispatch(deleteTrainer(id)))
}

export const setTrainerCards = (items) => ({
    type: Types.SET_TRAINER_CARDS,
    payload: items
})

export const setTrainers = (items) => ({
    type: Types.SET_TRAINERS,
    payload: items
})

export const deleteTrainer = (id) => ({
    type: Types.DELETE_TRAINER,
    payload: id
})