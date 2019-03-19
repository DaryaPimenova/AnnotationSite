const initialState = {
    isLoading: true
};


export default function auth(state=initialState, action) {

    switch (action.type) {

        case 'IMAGE_LOADING':
            return {...state, isLoading: true};

        default:
            return state;
    }
}