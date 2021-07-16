export const Types = {
    ADD_PLATE: 'PLATES@ADD_PLATE',
    DELETE_PLATE: 'PLATES@DELETE_PLATE',
}

export const addPlate = (items) => ({
    type: Types.ADD_PLATE,
    payload: items
})

export const deletePlate = (id) => ({
    type: Types.DELETE_PLATE,
    payload: id
})