import { Types } from '../actions/dancers'

import produce from 'immer';
import { filter } from 'lodash'

const initState = {
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_DANCERS:
                draft.items = action.payload;
                break;
            case Types.DELETE_DANCER:
                draft.items = filter(state.items, (item) => item.id !== action.payload);
                break;
            default:
        }
    });
};

export default a;