import { ADD_EDIT_CONTENT, ADD_EDIT_CONTENT_SUCCESS, ADD_EDIT_CONTENT_FAILURE, GET_CONTENT_DATA, GET_CONTENT_DATA_SUCCESS, GET_CONTENT_DATA_FAILURE } from "../Actiontype";

export const AddEditContent = (data) => {
  return {
    payload: data,
    type: ADD_EDIT_CONTENT,
  };
};

export const AddEditContentSuccess = (response) => {
  return {
    payload: response,
    type: ADD_EDIT_CONTENT_SUCCESS,
  };
};

export const AddEditContentFailure = (response) => {
  return {
    payload: response,
    type: ADD_EDIT_CONTENT_FAILURE,
  };
};

export const getContentData = () => {
  return {
    type: GET_CONTENT_DATA,
  };
};

export const getContentDataSuccess = (response) => {
  return {
    payload: response,
    type: GET_CONTENT_DATA_SUCCESS,
  };
};

export const getContentDataFailure = (response) => {
  return {
    payload: response,
    type: GET_CONTENT_DATA_FAILURE,
  };
};

