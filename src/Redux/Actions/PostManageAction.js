import {
    GET_POST_LIST,
    GET_POST_LIST_SUCCESS,
    GET_POST_LIST_FAILURE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    GET_POST_DETAILS,
    GET_POST_DETAILS_SUCCESS,
    GET_POST_DETAILS_FAILURE
} from "../Actiontype";

export const getPostList = (data) => {
    if (!data) {
        data = { search: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        type: GET_POST_LIST
    };
};

export const getPostListSuccess = response => {
    return {
        payload: response.data,
        type: GET_POST_LIST_SUCCESS
    };
};

export const getPostListFailure = response => {
    return {
        payload: response,
        type: GET_POST_LIST_FAILURE
    };
};

export const deletePost = (data) => {
    if (!data) {
        data = { id: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${data[key]}`),
        type: DELETE_POST
    };
};

export const deletePostSuccess = response => {
    return {
        payload: response,
        type: DELETE_POST_SUCCESS
    };
};

export const deletePostFailure = response => {
    return {
        payload: response,
        type: DELETE_POST_FAILURE
    };
};

export const getPostDetails = (data) => {
    if (!data) {
        data = { id: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        type: GET_POST_DETAILS
    };
};

export const getPostDetailsSuccess = response => {
    return {
        payload: response.data,
        type: GET_POST_DETAILS_SUCCESS
    };
};

export const getPostDetailsFailure = response => {
    return {
        payload: response,
        type: GET_POST_DETAILS_FAILURE
    };
};