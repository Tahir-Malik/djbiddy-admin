import {
  UPDATE_ADMIN_PROFILE,
  UPDATE_ADMIN_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD,
  GET_ADMIN_PROFILE,
  GET_ADMIN_PROFILE_SUCCESS,
  GET_ADMIN_PROFILE_FAILURE,
} from "../Actiontype";
const initialState = {
  isFetching: false,
  ProfileSuccess: false,
  ProfileSuccessMessage: "",
  ProfileFailure: false,
  ProfileFailureMessage: "",
  ForgotpassSuccess: false,
  ForgotpassSuccessMessage: "",
  ForgotpassFailure: false,
  ForgotpassFailureMessage: "",
  ProfileData: null,
};
export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADMIN_PROFILE:
      return {
        ...state,
        isFetching: true,
        ProfileSuccess: false,
        ProfileSuccessMessage: "",
        ProfileFailure: false,
        ProfileFailureMessage: "",
        ProfileData: null,
      };
    case UPDATE_ADMIN_PROFILE_SUCCESS:
      localStorage.setItem('Admin', action.payload.data.fullName)
      return {
        ...state,
        isFetching: false,
        ProfileSuccess: true,
        ProfileSuccessMessage: action.payload.message,
        ProfileData: action.payload.data,
      };
    case UPDATE_ADMIN_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ProfileFailure: true,
        ProfileFailureMessage: action.payload.message,
        ProfileData: null,
      };
    case GET_ADMIN_PROFILE:
      return {
        ...state,
        isFetching: true,
        ProfileSuccess: false,
        ProfileSuccessMessage: "",
        ProfileFailure: false,
        ProfileFailureMessage: "",
        ProfileData: null,
      };
    case GET_ADMIN_PROFILE_SUCCESS:
      localStorage.setItem('Admin', action.payload.data.fullName)
      return {
        ...state,
        isFetching: false,
        ProfileSuccess: true,
        ProfileData: action.payload.data,
      };
    case GET_ADMIN_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ProfileFailure: true,
        ProfileFailureMessage: action.payload.message,
        ProfileData: null,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        isFetching: true,
        ForgotpassSuccess: false,
        ForgotpassSuccessMessage: "",
        ForgotpassFailure: false,
        ForgotpassFailureMessage: "",
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ForgotpassSuccess: true,
        ForgotpassSuccessMessage: action.payload.message,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        ForgotpassFailure: true,
        ForgotpassFailureMessage: action.payload.message,
      };
    // case CLEAR_STORE:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     ProfileSuccess: false,
    //     ProfileSuccessMessage: "",
    //     ProfileFailure: false,
    //     ProfileFailureMessage: "",
    //     ProfileData: null,
    //     ForgotpassSuccess: false,
    //     ForgotpassSuccessMessage: "",
    //     ForgotpassFailure: false,
    //     ForgotpassFailureMessage: "",
    //   };
    default:
      return {
        ...state,
      };
  }
}
