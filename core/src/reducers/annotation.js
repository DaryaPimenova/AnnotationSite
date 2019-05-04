import C from '../constants';


const initialState = {
    isLoading: true,
    image_url: '',
    image_id: -1,
    image_for_classification_url: '',
    image_for_classification_id: -1,
    classes: [],
    statistics_messages: [],
    errors: {},
};


export default function annotation(state=initialState, action) {

    switch (action.type) {

        case C.SAVE_DETECTIONS_REQUEST: 
            return {
                ...state,
                isLoading: true
            }
        
        case C.SAVE_DETECTIONS_SUCCESSFUL: 
            return {
                ...state,
                ...action.data, 
                isLoading: false,
                errors: null
            }

        case C.SAVE_DETECTIONS_FAILED: 
            return {
                ...state,
                isLoading: false,
                errors: action.data, 
            }

        case C.SAVE_CLASSIFICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case C.SAVE_CLASSIFICATION_SUCCESSFUL:
            return {
                ...state,
                ...action.data,
                isLoading: false,
                errors: null
            }

        case C.SAVE_CLASSIFICATION_FAILED:
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

        case C.GET_STATISTICS_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case C.GET_STATISTICS_SUCCESSFUL:
            return {
                ...state,
                ...action.data,
                isLoading: false,
                errors: null
            }

        case C.GET_STATISTICS_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: action.data
            }

        default:
            return state;
    }
}
