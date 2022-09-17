import {
  UPDATE_ADMIN_PROFILE,
  UPDATE_ADMIN_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  GET_ADMIN_PROFILE,
  GET_ADMIN_PROFILE_SUCCESS,
  GET_ADMIN_PROFILE_FAILURE,

} from "../Actiontype";

export const UpdateProfile = data => {
  return {
    payload: data,
    type: UPDATE_ADMIN_PROFILE
  };
};
export const UpdateProfileSuccess = response => {
  return {
    payload: response,
    type: UPDATE_ADMIN_PROFILE_SUCCESS
  };
};
export const UpdateProfileFailure = response => {
  return {
    payload: response,
    type: UPDATE_ADMIN_PROFILE_FAILURE
  };
};


export const GetProfile = data => {
  return {
    payload: data,
    type: GET_ADMIN_PROFILE
  };
};
export const GetProfileSuccess = response => {
  return {
    payload: response,
    type: GET_ADMIN_PROFILE_SUCCESS
  };
};
export const GetProfileFailure = response => {
  return {
    payload: response,
    type: GET_ADMIN_PROFILE_FAILURE
  };
};

export const ForgotPassword = data => {
  return {
    payload: data,
    type: FORGOT_PASSWORD
  };
};

export const ForgotPasswordSuccess = response => {
  return {
    payload: response,
    type: FORGOT_PASSWORD_SUCCESS
  };
};

export const ForgotPasswordFailure = response => {
  return {
    payload: response,
    type: FORGOT_PASSWORD_FAILURE
  };
};
