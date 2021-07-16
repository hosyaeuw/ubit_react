import { Types } from '../actions/trainers'

import produce from 'immer';
import { filter } from 'lodash'

const initState = {
    items: [],
    cards: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_TRAINERS:
                draft.items = action.payload;
                break;
            case Types.SET_TRAINER_CARDS:
                draft.cards = action.payload;
                break;
            case Types.DELETE_TRAINER:
                draft.items = filter(state.items, (item) => item.id !== action.payload);
                break;
            default:
        }
    });
};

export default a;