import { Types } from '../actions/records'

import produce from 'immer';

const initState = {
    items: []
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_RECORDS:
                draft.items = action.payload;
                break;
            default:
        }
    });
};

export default a;