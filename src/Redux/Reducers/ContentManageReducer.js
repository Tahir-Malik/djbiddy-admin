import {
  ADD_EDIT_CONTENT, ADD_EDIT_CONTENT_SUCCESS, ADD_EDIT_CONTENT_FAILURE, GET_CONTENT_DATA, GET_CONTENT_DATA_SUCCESS, GET_CONTENT_DATA_FAILURE
} from "../Actiontype";

const initialState = {
  GetContentDataSuccess: false,
  GetContentDataSuccessMessage: "",
  GetContentDataFailure: false,
  GetContentDataFailureMessage: "",
  ContentManageSuccess: false,
  ContentManageSuccessMessage: "",
  ContentManageFailure: false,
  ContentManageFailureMessage: "",
  ContentData: null
};
export default function ContentManagementReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EDIT_CONTENT:
      return {
        ...state,
        isFetching: true,
        ContentManageSuccess: false,
        ContentManageSuccessMessage: "",
        ContentManageFailure: false,
        ContentManageFailureMessage: "",
        ContentData: null
      };
    case ADD_EDIT_CONTENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ContentManageSuccess: true,
        ContentManageSuccessMessage: action.payload.message,
        ContentData: action.payload
      };
    case ADD_EDIT_CONTENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        ContentManageFailure: true,
        ContentManageFailureMessage: action.payload.message,
      };
    case GET_CONTENT_DATA:
      return {
        ...state,
        isFetching: true,
        GetContentDataSuccess: false,
        GetContentDataSuccessMessage: "",
        GetContentDataFailure: false,
        GetContentDataFailureMessage: "",
        ContentData: null
      };
    case GET_CONTENT_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        GetContentDataSuccess: true,
        GetContentDataSuccessMessage: action.payload.message,
        ContentData: action.payload.data
      };
    case GET_CONTENT_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        GetContentDataFailure: true,
        GetContentDataFailureMessage: action.payload.message
      };
    default:
      return {
        ...state,
      };
  }
}
