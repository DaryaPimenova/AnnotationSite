import C from '../constants';


const initialState = {
    isLoading: true,
    image_url: '',
    image_id: -1,
    image_for_update_url: '',
    image_for_update_id: -1,
    classes: [],
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

        case C.SAVE_IMAGE_DATA_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case C.SAVE_IMAGE_DATA_SUCCESSFUL:
            return {
                ...state,
                ...action.data,
                isLoading: false,
                errors: null
            }

        case C.SAVE_IMAGE_DATA_FAILED:
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


        case C.LOAD_IMAGE_FOR_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        
        case C.LOAD_IMAGE_FOR_UPDATE_SUCCESSFUL:
            return {
                ...state,
                ...action.data,
                isLoading: false,
                errors: null
            }

        case C.LOAD_IMAGE_FOR_UPDATE_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: action.data
            }

        case C.DELETE_IMAGE_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case C.DELETE_IMAGE_SUCCESSFUL:
            return {
                ...state,
                ...action.data,
                isLoading: false,
                errors: null
            }

        case C.DELETE_IMAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: action.data
            }

        default:
            return state;
    }
}
