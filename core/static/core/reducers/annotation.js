import C from '../constants';


const initialState = {
    isLoading: true,
    imageUrl: 'media/annotated_images/wtf.jpg', // only for test!!!
    errors: {},
};


export default function annotation(state=initialState, action) {

    switch (action.type) {

        case C.SAVE_ANNOTATIONS_REQUEST: 
            return {
                ...state,
                isLoading: true
            }
        
        case C.SAVE_ANNOTATIONS_SUCCESSFUL: 
            return {
                ...state,
                ...action.data, 
                isLoading: false,
                errors: null
            }

        case C.SAVE_ANNOTATIONS_FAILED: 
            return {
                ...state,
                isLoading: false,
                errors: action.data, 
            }

        case C.LOAD_IMAGE_REQUEST: 
            return {
                ...state,
                isLoading: true
            }

        case C.LOAD_IMAGE_SUCCESSFUL: 
            return {
                ...state,
                ...action.data, 
                isLoading: false,
                errors: null
            }

        case C.LOAD_IMAGE_FAILED: 
            return {
                ...state,
                isLoading: false,
                errors: action.data, 
            }

        default:
            return state;
    }
}
