import C from '../constants';


export const saveDetections = (detections, image_id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({detections, image_id});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.SAVE_DETECTIONS_REQUEST});

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
                    dispatch({type: C.SAVE_DETECTIONS_SUCCESSFUL, data: res.data.image });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.SAVE_DETECTIONS_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.SAVE_DETECTIONS_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const saveClassification = (image_for_classification, style, technique, image_class) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({image_for_classification, style, technique, image_class});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.SAVE_CLASSIFICATION_REQUEST});

        return fetch("/api/annotations/image/save/", {headers, body, method: "POST"})
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
                    let data = {
                        image_for_classification_url: res.data.image.image_url,
                        image_for_classification: res.data.image.image_id,
                    }

                    dispatch({type: C.SAVE_CLASSIFICATION_SUCCESSFUL, data: data });
                    return data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.SAVE_CLASSIFICATION_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.SAVE_CLASSIFICATION_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const deleteImage = (image_id, is_classification=false) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({image_id, is_classification});

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
                    let data = {};
                    if (is_classification) {
                        data = {
                            image_for_classification_url: res.data.image.image_url,
                            image_for_classification: res.data.image.image_id,
                        }
                    } else {
                        data = res.data.image;
                    }
                    dispatch({type: C.DELETE_IMAGE_SUCCESSFUL, data: data });
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

export const loadImage = (is_classification=false) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.LOAD_IMAGE_REQUEST});

        return fetch(`/api/annotations/load_image/?is_classification=${is_classification}`, {headers, })
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
                    let data = {};
                    if (is_classification) {
                        data = {
                            image_for_classification_url: res.data.image.image_url,
                            image_for_classification: res.data.image.image_id,
                        }
                    } else {
                        data = res.data.image;
                    }
                    data.classes = res.data.classes;
                    dispatch({type: C.LOAD_IMAGE_SUCCESSFUL, data: data });
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

export const getStatistics = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.GET_STATISTICS_REQUEST});

        return fetch('/api/get_statistics/', {headers, })
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
                let data = res.data;
                if (res.status === 200) {
                    console.log('DATA:', data)
                    dispatch({type: C.GET_STATISTICS_SUCCESSFUL, data: data });
                    return data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.GET_STATISTICS_FAILED, data: data});
                    throw data;
                } else {
                    dispatch({type: C.GET_STATISTICS_FAILED, data: data});
                    throw data;
                }
            })
    }
}

export const getImagesGalery = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.GET_IMAGES_GALLERY_REQUEST});

        return fetch('/api/get_images_gallery/', {headers, })
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
                let data = res.data;
                if (res.status === 200) {
                    console.log('DATA:', data)
                    dispatch({type: C.GET_IMAGES_GALLERY_SUCCESSFUL, data: data });
                    return data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.GET_IMAGES_GALLERY_FAILED, data: data});
                    throw data;
                } else {
                    dispatch({type: C.GET_IMAGES_GALLERY_FAILED, data: data});
                    throw data;
                }
            })
    }
}
