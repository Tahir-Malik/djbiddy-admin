import {
    GET_POST_LIST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE,
    DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, GET_POST_DETAILS, GET_POST_DETAILS_SUCCESS, GET_POST_DETAILS_FAILURE
} from "../Actiontype";

const initialState = {
    PostDetails: null,
    PostListSuccess: false,
    PostListSuccessMessage: "",
    PostListFailure: false,
    PostListFailureMessage: "",
    PostListData: null,
    DeleteSuccess: false,
    DeleteSuccessMessage: "",
    DeleteFailure: false,
    DeleteFailureMessage: "",
    PostDetailsSuccess: false,
    PostDetailsSuccessMessage: "",
    PostDetailsFailure: false,
    PostDetailsFailureMessage: "",
    PostDetailsData: null
};
export default function PostManagementReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_LIST:
            return {
                ...state,
                isFetching: true,
                PostListSuccess: false,
                PostListSuccessMessage: "",
                PostListFailure: false,
                PostListFailureMessage: "",
                PostListData: null,
            };
        case GET_POST_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                PostListSuccess: true,
                PostListSuccessMessage: action.payload.message,
                PostListData: action.payload,
            };
        case GET_POST_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                PostListFailure: true,
                PostListFailureMessage: action.payload.message,
                PostListData: [],
            };
        case DELETE_POST:
            return {
                ...state,
                isFetching: true,
                DeleteSuccess: false,
                DeleteSuccessMessage: "",
                DeleteFailure: false,
                DeleteFailureMessage: ""
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                DeleteSuccess: true,
                DeleteSuccessMessage: action.payload.message,
            };
        case DELETE_POST_FAILURE:
            return {
                ...state,
                isFetching: false,
                DeleteFailure: true,
                DeleteFailureMessage: action.payload.message,
            };
        case GET_POST_DETAILS:
            return {
                ...state,
                isFetching: true,
                PostDetailsSuccess: false,
                PostDetailsSuccessMessage: "",
                PostDetailsFailure: false,
                PostDetailsFailureMessage: "",
                PostDetailsData: null
            };
        case GET_POST_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                PostDetailsSuccess: true,
                PostDetailsSuccessMessage: action.payload.message,
                PostDetailsData: action.payload
            };
        case GET_POST_DETAILS_FAILURE:
            return {
                ...state,
                isFetching: false,
                PostDetailsFailure: true,
                PostDetailsFailureMessage: action.payload.message,
                PostDetailsData: null
            };
        default:
            return {
                ...state,
            };
    }
}
