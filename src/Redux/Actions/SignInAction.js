import {
  SIGN_IN,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  TERMS_AND_CONDITIONS,
  TERMS_AND_CONDITIONS_SUCCESS,
  TERMS_AND_CONDITIONS_FAILURE
} from "../Actiontype";

export const HandleSignIn = (SignInData, rem) => {
  return {
    payload: SignInData,
    rememberMe: rem,
    type: SIGN_IN
  };
};
export const SignInSuccess = response => {
  return {
    payload: response.data,
    type: SIGN_IN_SUCCESS
  };
};
export const SignInFailure = response => {
  return {
    payload: response,
    type: SIGN_IN_FAILURE
  };
};

export const getTermsAndConditions = () => {
  return {
    type: TERMS_AND_CONDITIONS
  };
};

export const termsAndConditionsSuccess = response => {
  return {
    payload: response.data,
    type: TERMS_AND_CONDITIONS_SUCCESS
  };
};

export const termsAndConditionsFailure = response => {
  return {
    payload: response,
    type: TERMS_AND_CONDITIONS_FAILURE
  };
};
