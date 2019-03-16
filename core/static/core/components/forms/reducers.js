import C from './constants';

const initialState = {

};

export default function login(state = initialState, action) {
    switch (action.type) {
        case C.DELETE_EXPENSES_SUCCESS:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state;
    }
}
