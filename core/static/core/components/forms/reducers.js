import C from './constants';

const initialState = {
    isFetching: false,
    signingError: '',
};

export default function signing(state = initialState, action) {
    switch (action.type) {
        case C.SIGN_IN_REQUEST:
            return {
                ...state,
                isFetching: true,
                signingError: ''
            }
        case C.SIGN_IN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                signingError: '',
            }
        case C.SIGN_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
                signingError: action.signingError
            }

        case C.SIGN_UP_REQUEST:
            return {
                ...state,
                isFetching: true,
                signingError: '',
            }
        case C.SIGN_UP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                signingError: '',
            }
        case C.SIGN_UP_FAILURE:
            return {
                ...state,
                isFetching: false,
                signingError: action.signingError
            }

        default:
            return state;
    }
}
