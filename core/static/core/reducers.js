import {combineReducers} from 'redux';
import login from './components/forms/reducers';

const rootReducer = combineReducers({
    login,
});

export default rootReducer;
