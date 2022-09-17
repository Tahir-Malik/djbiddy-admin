import {
    GET_CHALLENGE_LIST, GET_CHALLENGE_LIST_SUCCESS, GET_CHALLENGE_LIST_FAILURE, ADD_CHALLENGE, ADD_CHALLENGE_SUCCESS, ADD_CHALLENGE_FAILURE, EDIT_CHALLENGE, EDIT_CHALLENGE_SUCCESS, EDIT_CHALLENGE_FAILURE,
    DELETE_CHALLENGE, DELETE_CHALLENGE_SUCCESS, DELETE_CHALLENGE_FAILURE, GET_CHALLENGE_DETAILS, GET_CHALLENGE_DETAILS_SUCCESS, GET_CHALLENGE_DETAILS_FAILURE,
    GET_USER_CHALLENGE_LIST, GET_USER_CHALLENGE_LIST_SUCCESS, GET_USER_CHALLENGE_LIST_FAILURE, DELETE_USER_CHALLENGE, DELETE_USER_CHALLENGE_SUCCESS, DELETE_USER_CHALLENGE_FAILURE,
    GET_USER_CHALLENGE_DETAILS, GET_USER_CHALLENGE_DETAILS_SUCCESS, GET_USER_CHALLENGE_DETAILS_FAILURE
} from "../Actiontype";

const initialState = {
    AddorEditchallengeSuccess: false,
    AddorEditchallengeSuccessMessage: "",
    AddorEditchallengeFailure: false,
    AddorEditchallengeFailureMessage: "",
    ChallengeDetails: null,
    ChallengeListSuccess: false,
    ChallengeListSuccessMessage: "",
    ChallengeListFailure: false,
    ChallengeListFailureMessage: "",
    ChallengeListData: null,
    DeleteSuccess: false,
    DeleteSuccessMessage: "",
    DeleteFailure: false,
    DeleteFailureMessage: "",
    ChallengeDetailsSuccess: false,
    ChallengeDetailsSuccessMessage: "",
    ChallengeDetailsFailure: false,
    ChallengeDetailsFailureMessage: "",
    ChallengeDetailsData: null,
    UserChallengeListData: null
};
export default function ChallengeManagementReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHALLENGE_LIST:
            return {
                ...state,
                isFetching: true,
                ChallengeListSuccess: false,
                ChallengeListSuccessMessage: "",
                ChallengeListFailure: false,
                ChallengeListFailureMessage: "",
                ChallengeListData: null,
            };
        case GET_CHALLENGE_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ChallengeListSuccess: true,
                ChallengeListSuccessMessage: action.payload.message,
                ChallengeListData: action.payload,
            };
        case GET_CHALLENGE_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                ChallengeListFailure: true,
                ChallengeListFailureMessage: action.payload.message,
                ChallengeListData: [],
            };
        case ADD_CHALLENGE:
            return {
                ...state,
                isFetching: true,
                AddorEditchallengeSuccess: false,
                AddorEditchallengeSuccessMessage: "",
                AddorEditchallengeFailure: false,
                AddorEditchallengeFailureMessage: "",
            };
        case ADD_CHALLENGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                AddorEditchallengeSuccess: true,
                AddorEditchallengeSuccessMessage: action.payload.message,
            };
        case ADD_CHALLENGE_FAILURE:
            return {
                ...state,
                isFetching: false,
                AddorEditchallengeFailure: true,
                AddorEditchallengeFailureMessage: action.payload.message,
            };
        case EDIT_CHALLENGE:
            return {
                ...state,
                isFetching: true,
                AddorEditchallengeSuccess: false,
                AddorEditchallengeSuccessMessage: "",
                AddorEditchallengeFailure: false,
                AddorEditchallengeFailureMessage: "",
            };
        case EDIT_CHALLENGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                AddorEditchallengeSuccess: true,
                AddorEditchallengeSuccessMessage: action.payload.message,
            };
        case EDIT_CHALLENGE_FAILURE:
            return {
                ...state,
                isFetching: false,
                AddorEditchallengeFailure: true,
                AddorEditchallengeFailureMessage: action.payload.message,
            };
        case DELETE_CHALLENGE:
            return {
                ...state,
                isFetching: true,
                DeleteSuccess: false,
                DeleteSuccessMessage: "",
                DeleteFailure: false,
                DeleteFailureMessage: ""
            };
        case DELETE_CHALLENGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                DeleteSuccess: true,
                DeleteSuccessMessage: action.payload.message,
            };
        case DELETE_CHALLENGE_FAILURE:
            return {
                ...state,
                isFetching: false,
                DeleteFailure: true,
                DeleteFailureMessage: action.payload.message,
            };
        case GET_CHALLENGE_DETAILS:
            return {
                ...state,
                isFetching: true,
                ChallengeDetailsSuccess: false,
                ChallengeDetailsSuccessMessage: "",
                ChallengeDetailsFailure: false,
                ChallengeDetailsFailureMessage: "",
                ChallengeDetailsData: null
            };
        case GET_CHALLENGE_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ChallengeDetailsSuccess: true,
                ChallengeDetailsSuccessMessage: action.payload.message,
                ChallengeDetailsData: action.payload
            };
        case GET_CHALLENGE_DETAILS_FAILURE:
            return {
                ...state,
                isFetching: false,
                ChallengeDetailsFailure: true,
                ChallengeDetailsFailureMessage: action.payload.message,
                ChallengeDetailsData: null
            };
        case GET_USER_CHALLENGE_LIST:
            return {
                ...state,
                isFetching: true,
                UserChallengeListSuccess: false,
                UserChallengeListSuccessMessage: "",
                UserChallengeListFailure: false,
                UserChallengeListFailureMessage: "",
                UserChallengeListData: null
            };
        case GET_USER_CHALLENGE_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                UserChallengeListSuccess: true,
                UserChallengeListSuccessMessage: action.payload.message,
                UserChallengeListData: action.payload
            };
        case GET_USER_CHALLENGE_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                UserChallengeListFailure: true,
                UserChallengeListFailureMessage: action.payload.message,
                UserChallengeListData: []
            };
        case DELETE_USER_CHALLENGE:
            return {
                ...state,
                isFetching: true,
                DeleteSuccess: false,
                DeleteSuccessMessage: "",
                DeleteFailure: false,
                DeleteFailureMessage: ""
            };
        case DELETE_USER_CHALLENGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                DeleteSuccess: true,
                DeleteSuccessMessage: action.payload.message,
            };
        case DELETE_USER_CHALLENGE_FAILURE:
            return {
                ...state,
                isFetching: false,
                DeleteFailure: true,
                DeleteFailureMessage: action.payload.message,
            };
        case GET_USER_CHALLENGE_DETAILS:
            return {
                ...state,
                isFetching: true,
                ChallengeDetailsSuccess: false,
                ChallengeDetailsSuccessMessage: "",
                ChallengeDetailsFailure: false,
                ChallengeDetailsFailureMessage: "",
                ChallengeDetailsData: null
            };
        case GET_USER_CHALLENGE_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ChallengeDetailsSuccess: true,
                ChallengeDetailsSuccessMessage: action.payload.message,
                ChallengeDetailsData: action.payload
            };
        case GET_USER_CHALLENGE_DETAILS_FAILURE:
            return {
                ...state,
                isFetching: false,
                ChallengeDetailsFailure: true,
                ChallengeDetailsFailureMessage: action.payload.message,
                ChallengeDetailsData: null
            };
        default:
            return {
                ...state,
            };
    }
}
