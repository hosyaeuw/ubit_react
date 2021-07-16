import { Types } from '../actions/user'

import produce from 'immer';

const initState = {
    token: null,
    user: null
};

const a = (state = initState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case Types.SET_TOKEN:
                draft.token = action.payload;
                break;
            case Types.SET_USER:
                draft.user = action.payload;
                break;
            default:
        }
    });
};

export default a;