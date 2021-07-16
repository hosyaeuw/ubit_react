import { Types } from '../actions/timetable'

import produce from 'immer';

import { filter } from 'lodash'

const initState = {
    isLoaded: false,
    cards: [],
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_TIMETABLE:
                draft.items = action.payload;
                break;
            case Types.SET_LOADED:
                draft.isLoaded = action.payload;
                break;
            case Types.SET_BUILD_TIMETABLE:
                draft.cards = action.payload
                break;
            case Types.DELETE_TIMETABLE:
                draft.items = filter(state.items, (item) => item.id !== action.payload);
                break;
            default:
        }
    });
};

export default a;