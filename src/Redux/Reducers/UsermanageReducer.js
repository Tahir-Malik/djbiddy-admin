import {
  GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE, ADD_USER, ADD_USER_SUCCESS, ADD_USER_FAILURE, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, GET_USER_DETAILS, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAILURE, RESUME_SUSPEND_USER, RESUME_SUSPEND_USER_SUCCESS, RESUME_SUSPEND_USER_FAILURE
} from "../Actiontype";

const initialState = {
  AddorEdituserSuccess: false,
  AddorEdituserSuccessMessage: "",
  AddorEdituserFailure: false,
  AddorEdituserFailureMessage: "",
  UserDetails: null,
  UserListSuccess: false,
  UserListSuccessMessage: "",
  UserListFailure: false,
  UserListFailureMessage: "",
  UserListData: null,
  DeleteSuccess: false,
  DeleteSuccessMessage: "",
  DeleteFailure: false,
  DeleteFailureMessage: "",
  UserDetailsSuccess: false,
  UserDetailsSuccessMessage: "",
  UserDetailsFailure: false,
  UserDetailsFailureMessage: "",
  UserDetailsData: null,
  ResumeSuspendUserSuccess: false,
  ResumeSuspendUserSuccessMessage: "",
  ResumeSuspendUserFailure: false,
  ResumeSuspendUserFailureMessage: "",
};
export default function UserManagementReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        isFetching: true,
        UserListSuccess: false,
        UserListSuccessMessage: "",
        UserListFailure: false,
        UserListFailureMessage: "",
        UserListData: null,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        UserListSuccess: true,
        UserListSuccessMessage: action.payload.message,
        UserListData: action.payload,
      };
    case GET_USER_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        UserListFailure: true,
        UserListFailureMessage: action.payload.message,
        UserListData: [],
      };
    case ADD_USER:
      return {
        ...state,
        isFetching: true,
        AddorEdituserSuccess: false,
        AddorEdituserSuccessMessage: "",
        AddorEdituserFailure: false,
        AddorEdituserFailureMessage: "",
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        AddorEdituserSuccess: true,
        AddorEdituserSuccessMessage: action.payload.message,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        AddorEdituserFailure: true,
        AddorEdituserFailureMessage: action.payload.message,
      };
    case EDIT_USER:
      return {
        ...state,
        isFetching: true,
        AddorEdituserSuccess: false,
        AddorEdituserSuccessMessage: "",
        AddorEdituserFailure: false,
        AddorEdituserFailureMessage: "",
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        AddorEdituserSuccess: true,
        AddorEdituserSuccessMessage: action.payload.message,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        AddorEdituserFailure: true,
        AddorEdituserFailureMessage: action.payload.message,
      };
    case DELETE_USER:
      return {
        ...state,
        isFetching: true,
        DeleteSuccess: false,
        DeleteSuccessMessage: "",
        DeleteFailure: false,
        DeleteFailureMessage: ""
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        DeleteSuccess: true,
        DeleteSuccessMessage: action.payload.message,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        DeleteFailure: true,
        DeleteFailureMessage: action.payload.message,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        isFetching: true,
        UserDetailsSuccess: false,
        UserDetailsSuccessMessage: "",
        UserDetailsFailure: false,
        UserDetailsFailureMessage: "",
        UserDetailsData: null
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        UserDetailsSuccess: true,
        UserDetailsSuccessMessage: action.payload.message,
        UserDetailsData: action.payload
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        UserDetailsFailure: true,
        UserDetailsFailureMessage: action.payload.message,
        UserDetailsData: null
      };
    case RESUME_SUSPEND_USER:
      return {
        ...state,
        isFetching: true,
        ResumeSuspendUserSuccess: false,
        ResumeSuspendUserSuccessMessage: "",
        ResumeSuspendUserFailure: false,
        ResumeSuspendUserFailureMessage: "",
      };
    case RESUME_SUSPEND_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ResumeSuspendUserSuccess: true,
        ResumeSuspendUserSuccessMessage: action.payload.message,
      };
    case RESUME_SUSPEND_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        ResumeSuspendUserFailure: true,
        ResumeSuspendUserFailureMessage: action.payload.message,
      };
    default:
      return {
        ...state,
      };
  }
}
