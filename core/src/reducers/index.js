import { combineReducers } from 'redux';
import annotation from "./annotation";
import auth from "./auth";


const annotationApp = combineReducers({
    annotation, auth,
})

export default annotationApp;
