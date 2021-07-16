import { Types } from '../actions/lessonTimes'

import produce from 'immer';
import { filter } from 'lodash'

const initState = {
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_LESSONTIMES:
                draft.items = action.payload;
                break;
            case Types.DELETE_LESSONTIMES:
                draft.items = filter(state.items, (item) => item.id !== action.payload);
                break;
            default:
        }
    });
};

export default a;