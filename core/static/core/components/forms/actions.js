import C from './constants';
import fetch from 'cross-fetch';
import {errorMessageToString, swalError} from 'utils';

export function signIn(submitForm) {
    return async dispatch => {
        dispatch({
            type: C.SIGN_IN_REQUEST
        });

        try {
            const res = await fetch('login', {
                method: 'POST',
                body: JSON.stringify(submitForm)
            });

            if (res.status >= 400) {
                throw new Error('Bad response from server');
            }

            const resJson = await res.json();
            if (resJson.status) {
                dispatch({
                    type: C.SIGN_IN_SUCCESS,
                    data: data
                })
            } else {
                dispatch({type: C.SIGN_IN_FAILURE, signingError: errorMessageToString(err)});
                swalError(err);
            }
        } catch (err) {
            dispatch({type: C.SIGN_IN_FAILURE, signingError: errorMessageToString(err)});
            swalError(err);
        }
    };
}
