import { Types } from '../actions/plates'

import produce from 'immer';
import { filter, forEach } from 'lodash'

const initState = {
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.ADD_PLATE:
                draft.items.push(action.payload);
                break;
            case Types.DELETE_PLATE:
                draft.items.splice(action.payload, 1);
                break;
            default:
        }
    });
};

export default a;