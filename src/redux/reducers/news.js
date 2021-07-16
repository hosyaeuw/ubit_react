import { Types } from '../actions/news'

import produce from 'immer';
import { filter } from 'lodash'

const initState = {
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_NEWS:
                draft.items = action.payload;
                break;
                case Types.SET_EVENTS:
                    draft.events = action.payload;
                    break;
            case Types.DELETE_NEWS:
                draft.items = filter(state.items, (item) => item.id !== action.payload);
                break;
            default:
        }
    });
};

export default a;