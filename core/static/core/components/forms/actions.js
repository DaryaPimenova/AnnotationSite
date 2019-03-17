import C from './constants';
import {errorMessageToString, swalError} from 'utils';

export function signIn(submitForm) {
    return (dispatch, getState) => {

        dispatch({
            type: C.SIGN_IN_REQUEST
        });

        $.ajax({
            url: `login`,
            type: 'POST',
            data: $(submitForm).serialize(),
            dataType: 'json',
        }).done(function(data) {
            if (data.status) {
                dispatch({
                    type: C.SIGN_IN_SUCCESS,
                    data: data
                })
            } else {
                dispatch({type: C.SIGN_IN_FAILURE, signingError: errorMessageToString(data.errors)});
                swalError(err);
            }
        }).fail(function() {
            dispatch({type: C.SIGN_IN_FAILURE, signingError: errorMessageToString()});
            swalError();
        });
    }
}

export function signUp(submitForm) {
    return (dispatch, getState) => {

        dispatch({
            type: C.SIGN_UP_REQUEST
        });

        $.ajax({
            url: `signup`,
            type: 'POST',
            data: $(submitForm).serialize(),
            dataType: 'json',
        }).done(function(data) {
            if (data.status) {
                dispatch({
                    type: C.SIGN_UP_SUCCESS,
                    data: data
                })
            } else {
                dispatch({type: C.SIGN_UP_FAILURE, signingError: errorMessageToString(data.errors)});
                swalError(err);
            }
        }).fail(function() {
            dispatch({type: C.SIGN_UP_FAILURE, signingError: errorMessageToString()});
            swalError();
        });
    }
}
