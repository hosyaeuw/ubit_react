import { Types } from '../actions/lessons'

import produce from 'immer';
import { filter } from 'lodash'

const initState = {
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_LESSONS:
                draft.items = action.payload;
                break;
            case Types.DELETE_LESSON:
                draft.items = filter(state.items, (item) => item.id !== action.payload);
                break;
            default:
        }
    });
};

export default a;