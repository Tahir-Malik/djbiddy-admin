import {
	GET_USER_LIST,
	GET_DJ_USER_LIST,
	GET_USER_LIST_SUCCESS,
	GET_USER_LIST_FAILURE,
	ADD_USER,
	ADD_USER_SUCCESS,
	ADD_USER_FAILURE,
	EDIT_USER,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAILURE,
	DELETE_USER,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILURE,
	GET_USER_DETAILS,
	GET_USER_DETAILS_SUCCESS,
	GET_USER_DETAILS_FAILURE,
	RESUME_SUSPEND_USER,
	RESUME_SUSPEND_USER_SUCCESS,
	RESUME_SUSPEND_USER_FAILURE,
	GET_DJ_USER_DETAILS,
} from '../Actiontype';

export const getUserList = (data) => {
	if (!data) {
		data = { search: '' };
	}
	return {
		payload: Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&'),
		type: GET_USER_LIST,
	};
};

export const getDjUserList = (data) => {
	if (!data) {
		data = { search: '' };
	}
	return {
		payload: Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&'),
		type: GET_DJ_USER_LIST,
	};
};

export const getUserListSuccess = (response) => {
	return {
		payload: response.data,
		type: GET_USER_LIST_SUCCESS,
	};
};

export const getUserListFailure = (response) => {
	return {
		payload: response,
		type: GET_USER_LIST_FAILURE,
	};
};

export const AddUser = (data) => {
	return {
		payload: data,
		type: ADD_USER,
	};
};

export const AddUserSuccess = (response) => {
	return {
		payload: response,
		type: ADD_USER_SUCCESS,
	};
};

export const AddUserFailure = (response) => {
	return {
		payload: response,
		type: ADD_USER_FAILURE,
	};
};

export const EditUser = (data) => {
	return {
		payload: data,
		type: EDIT_USER,
	};
};

export const EditUserSuccess = (response) => {
	return {
		payload: response,
		type: EDIT_USER_SUCCESS,
	};
};

export const EditUserFailure = (response) => {
	return {
		payload: response,
		type: EDIT_USER_FAILURE,
	};
};

export const deleteUser = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_USER,
	};
};

export const deleteUserSuccess = (response) => {
	return {
		payload: response,
		type: DELETE_USER_SUCCESS,
	};
};

export const deleteUserFailure = (response) => {
	return {
		payload: response,
		type: DELETE_USER_FAILURE,
	};
};

export const getUserDetails = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&'),
		type: GET_USER_DETAILS,
	};
};

export const getDjUserDetails = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&'),
		type: GET_DJ_USER_DETAILS,
	};
};

export const getUserDetailsSuccess = (response) => {
	return {
		payload: response.data,
		type: GET_USER_DETAILS_SUCCESS,
	};
};

export const getUserDetailsFailure = (response) => {
	return {
		payload: response,
		type: GET_USER_DETAILS_FAILURE,
	};
};

export const resumeSuspendUser = (data) => {
	return {
		payload: Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&'),
		type: RESUME_SUSPEND_USER,
	};
};

export const resumeSuspendUserSuccess = (response) => {
	return {
		payload: response,
		type: RESUME_SUSPEND_USER_SUCCESS,
	};
};
export const resumeSuspendUserFailure = (response) => {
	return {
		payload: response,
		type: RESUME_SUSPEND_USER_FAILURE,
	};
};
