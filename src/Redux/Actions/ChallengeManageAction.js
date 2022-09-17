import {
    GET_CHALLENGE_LIST,
    GET_CHALLENGE_LIST_SUCCESS,
    GET_CHALLENGE_LIST_FAILURE,
    ADD_CHALLENGE,
    ADD_CHALLENGE_SUCCESS,
    ADD_CHALLENGE_FAILURE,
    EDIT_CHALLENGE,
    EDIT_CHALLENGE_SUCCESS,
    EDIT_CHALLENGE_FAILURE,
    DELETE_CHALLENGE,
    DELETE_CHALLENGE_SUCCESS,
    DELETE_CHALLENGE_FAILURE,
    GET_CHALLENGE_DETAILS,
    GET_CHALLENGE_DETAILS_SUCCESS,
    GET_CHALLENGE_DETAILS_FAILURE,
    GET_USER_CHALLENGE_LIST,
    GET_USER_CHALLENGE_LIST_SUCCESS,
    GET_USER_CHALLENGE_LIST_FAILURE,
    DELETE_USER_CHALLENGE,
    DELETE_USER_CHALLENGE_SUCCESS,
    DELETE_USER_CHALLENGE_FAILURE,
    GET_USER_CHALLENGE_DETAILS,
    GET_USER_CHALLENGE_DETAILS_SUCCESS,
    GET_USER_CHALLENGE_DETAILS_FAILURE
} from "../Actiontype";

export const getChallengeList = (data) => {
    if (!data) {
        data = { search: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        type: GET_CHALLENGE_LIST
    };
};

export const getChallengeListSuccess = response => {
    return {
        payload: response.data,
        type: GET_CHALLENGE_LIST_SUCCESS
    };
};

export const getChallengeListFailure = response => {
    return {
        payload: response,
        type: GET_CHALLENGE_LIST_FAILURE
    };
};

export const AddChallenge = (data) => {
    return {
        payload: data,
        type: ADD_CHALLENGE,
    };
};

export const AddChallengeSuccess = (response) => {
    return {
        payload: response,
        type: ADD_CHALLENGE_SUCCESS,
    };
};

export const AddChallengeFailure = (response) => {
    return {
        payload: response,
        type: ADD_CHALLENGE_FAILURE,
    };
};

export const EditChallenge = (data) => {
    return {
        payload: data,
        type: EDIT_CHALLENGE,
    };
};

export const EditChallengeSuccess = (response) => {
    return {
        payload: response,
        type: EDIT_CHALLENGE_SUCCESS,
    };
};

export const EditChallengeFailure = (response) => {
    return {
        payload: response,
        type: EDIT_CHALLENGE_FAILURE,
    };
};

export const deleteChallenge = (data) => {
    if (!data) {
        data = { id: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${data[key]}`),
        type: DELETE_CHALLENGE
    };
};

export const deleteChallengeSuccess = response => {
    return {
        payload: response,
        type: DELETE_CHALLENGE_SUCCESS
    };
};

export const deleteChallengeFailure = response => {
    return {
        payload: response,
        type: DELETE_CHALLENGE_FAILURE
    };
};

export const getChallengeDetails = (data) => {
    if (!data) {
        data = { id: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        type: GET_CHALLENGE_DETAILS
    };
};

export const getChallengeDetailsSuccess = response => {
    return {
        payload: response.data,
        type: GET_CHALLENGE_DETAILS_SUCCESS
    };
};

export const getChallengeDetailsFailure = response => {
    return {
        payload: response,
        type: GET_CHALLENGE_DETAILS_FAILURE
    };
};

export const getUserChallengeList = (data) => {
    if (!data) {
        data = { search: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        type: GET_USER_CHALLENGE_LIST
    };
};

export const getUserChallengeListSuccess = response => {
    return {
        payload: response.data,
        type: GET_USER_CHALLENGE_LIST_SUCCESS
    };
};

export const getUserChallengeListFailure = response => {
    return {
        payload: response,
        type: GET_USER_CHALLENGE_LIST_FAILURE
    };
};

export const deleteUserChallenge = (data) => {
    if (!data) {
        data = { id: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${data[key]}`),
        type: DELETE_USER_CHALLENGE
    };
};

export const deleteUserChallengeSuccess = response => {
    return {
        payload: response,
        type: DELETE_USER_CHALLENGE_SUCCESS
    };
};

export const deleteUserChallengeFailure = response => {
    return {
        payload: response,
        type: DELETE_USER_CHALLENGE_FAILURE
    };
};

export const getUserChallengeDetails = (data) => {
    if (!data) {
        data = { id: '' }
    }
    return {
        payload: Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        type: GET_USER_CHALLENGE_DETAILS
    };
};

export const getUserChallengeDetailsSuccess = response => {
    return {
        payload: response.data,
        type: GET_USER_CHALLENGE_DETAILS_SUCCESS
    };
};

export const getUserChallengeDetailsFailure = response => {
    return {
        payload: response,
        type: GET_USER_CHALLENGE_DETAILS_FAILURE
    };
};