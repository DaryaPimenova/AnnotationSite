import C from '../constants';


export const saveAnnotations = (annotations, image_id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({annotations, image_id});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.SAVE_ANNOTATIONS_REQUEST});

        return fetch("/api/annotations/save/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: C.SAVE_ANNOTATIONS_SUCCESSFUL, data: res.data.image });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.SAVE_ANNOTATIONS_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.SAVE_ANNOTATIONS_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const deleteImage = (image_id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({image_id});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.DELETE_IMAGE_REQUEST});

        return fetch("/api/annotations/delete_image/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: C.DELETE_IMAGE_SUCCESSFUL, data: res.data.image });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.DELETE_IMAGE_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.DELETE_IMAGE_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const loadImage = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.LOAD_IMAGE_REQUEST});

        return fetch("/api/annotations/load_image/", {headers, })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: C.LOAD_IMAGE_SUCCESSFUL, data: res.data });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.LOAD_IMAGE_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.LOAD_IMAGE_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}
