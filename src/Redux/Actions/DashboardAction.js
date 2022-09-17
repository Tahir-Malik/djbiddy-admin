import {
	DELETE_INVIT_EVENT,DELETE_INVIT_EVENT_SUCCESS,DELETE_INVIT_EVENT_FAILURE,
	GET_INVIT_EVENT_LIST,
	GET_INVIT_EVENT_LIST_SUCCESS,
	GET_INVIT_EVENT_LIST_FAILURE,


	DELETE_EVENT,DELETE_EVENT_SUCCESS,DELETE_EVENT_FAILURE,
	GET_EVENT_LIST,
	GET_EVENT_LIST_SUCCESS,
	GET_EVENT_LIST_FAILURE,
	ADD_EVENT,ADD_EVENT_SUCCESS,ADD_EVENT_FAILURE,

	GET_HASHTAG_LIST,
	GET_HASHTAG_LIST_SUCCESS,
	GET_HASHTAG_LIST_FAILURE,
	GET_CATEGORY_LIST,
	GET_CATEGORY_LIST_SUCCESS,
	GET_CATEGORY_LIST_FAILURE,
	DELETE_HASHTAG,
	DELETE_HASHTAG_SUCCESS,
	DELETE_HASHTAG_FAILURE,
	DELETE_CATEGORY,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAILURE,
	ADD_HASHTAG,
	ADD_HASHTAG_SUCCESS,
	ADD_HASHTAG_FAILURE,
	EDIT_HASHTAG,
	EDIT_HASHTAG_SUCCESS,
	EDIT_HASHTAG_FAILURE,
	ADD_CATEGORY,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAILURE,
	EDIT_CATEGORY,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILURE,
	GET_EVENT_CATEGORY_LIST,
	GET_EVENT_CATEGORY_LIST_SUCCESS,
	GET_EVENT_CATEGORY_LIST_FAILURE,
	GET_MUSIC_CATEGORY_LIST,
	GET_MUSIC_CATEGORY_LIST_SUCCESS,
	GET_MUSIC_CATEGORY_LIST_FAILURE,
	DELETE_EVENT_CATEGORY,
	DELETE_EVENT_CATEGORY_SUCCESS,
	DELETE_EVENT_CATEGORY_FAILURE,
	DELETE_MUSIC_CATEGORY,
	DELETE_MUSIC_CATEGORY_SUCCESS,
	DELETE_MUSIC_CATEGORY_FAILURE,
	ADD_EVENT_CATEGORY,
	ADD_EVENT_CATEGORY_SUCCESS,
	ADD_EVENT_CATEGORY_FAILURE,
	EDIT_EVENT_CATEGORY,
	EDIT_EVENT_CATEGORY_SUCCESS,
	EDIT_EVENT_CATEGORY_FAILURE,
	ADD_MUSIC_CATEGORY,
	ADD_MUSIC_CATEGORY_SUCCESS,
	ADD_MUSIC_CATEGORY_FAILURE,
	EDIT_MUSIC_CATEGORY,
	EDIT_MUSIC_CATEGORY_SUCCESS,
	EDIT_MUSIC_CATEGORY_FAILURE,
} from '../Actiontype';

export const getHashTagList = () => {
	return {
		type: GET_HASHTAG_LIST,
	};
};

export const getHashTagListSuccess = (response) => {
	return {
		payload: response.data,
		type: GET_HASHTAG_LIST_SUCCESS,
	};
};

export const getHashTagListFailure = (response) => {
	return {
		payload: response,
		type: GET_HASHTAG_LIST_FAILURE,
	};
};

export const getCategoryList = () => {
	return {
		type: GET_CATEGORY_LIST,
	};
};

export const getCategoryListSuccess = (response) => {
	return {
		payload: response.data,
		type: GET_CATEGORY_LIST_SUCCESS,
	};
};

export const getCategoryListFailure = (response) => {
	return {
		payload: response,
		type: GET_CATEGORY_LIST_FAILURE,
	};
};

export const deleteHashTag = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_HASHTAG,
	};
};

export const deleteHashTagSuccess = (response) => {
	return {
		payload: response,
		type: DELETE_HASHTAG_SUCCESS,
	};
};

export const deleteHashTagFailure = (response) => {
	return {
		payload: response,
		type: DELETE_HASHTAG_FAILURE,
	};
};

export const deleteCategory = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_CATEGORY,
	};
};

export const deleteCategorySuccess = (response) => {
	return {
		payload: response,
		type: DELETE_CATEGORY_SUCCESS,
	};
};

export const deleteCategoryFailure = (response) => {
	return {
		payload: response,
		type: DELETE_CATEGORY_FAILURE,
	};
};

export const addHashTag = (data) => {
	return {
		payload: data,
		type: ADD_HASHTAG,
	};
};

export const addHashTagSuccess = (response) => {
	return {
		payload: response,
		type: ADD_HASHTAG_SUCCESS,
	};
};

export const addHashTagFailure = (response) => {
	return {
		payload: response,
		type: ADD_HASHTAG_FAILURE,
	};
};

export const editHashTag = (data) => {
	return {
		payload: data,
		type: EDIT_HASHTAG,
	};
};

export const editHashTagSuccess = (response) => {
	return {
		payload: response,
		type: EDIT_HASHTAG_SUCCESS,
	};
};

export const editHashTagFailure = (response) => {
	return {
		payload: response,
		type: EDIT_HASHTAG_FAILURE,
	};
};

export const addCategory = (data) => {
	return {
		payload: data,
		type: ADD_CATEGORY,
	};
};

export const addCategorySuccess = (response) => {
	return {
		payload: response,
		type: ADD_CATEGORY_SUCCESS,
	};
};

export const addCategoryFailure = (response) => {
	return {
		payload: response,
		type: ADD_CATEGORY_FAILURE,
	};
};

export const editCategory = (data) => {
	return {
		payload: data,
		type: EDIT_CATEGORY,
	};
};

export const editCategorySuccess = (response) => {
	return {
		payload: response,
		type: EDIT_CATEGORY_SUCCESS,
	};
};

export const editCategoryFailure = (response) => {
	return {
		payload: response,
		type: EDIT_CATEGORY_FAILURE,
	};
};

export const getEventCategoryList = () => {
	return {
		type: GET_EVENT_CATEGORY_LIST,
	};
};

export const getEventCategoryListSuccess = (response) => {
	console.log("response.data",response.data)
	return {
		payload: response.data,
		type: GET_EVENT_CATEGORY_LIST_SUCCESS,
	};
};

export const getEventCategoryListFailure = (response) => {
	return {
		payload: response,
		type: GET_EVENT_CATEGORY_LIST_FAILURE,
	};
};

export const getMusicCategoryList = () => {
	return {
		type: GET_MUSIC_CATEGORY_LIST,
	};
};

export const getMusicCategoryListSuccess = (response) => {
	return {
		payload: response.data,
		type: GET_MUSIC_CATEGORY_LIST_SUCCESS,
	};
};

export const getMusicCategoryListFailure = (response) => {
	return {
		payload: response,
		type: GET_MUSIC_CATEGORY_LIST_FAILURE,
	};
};

export const deleteEventCategory = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_EVENT_CATEGORY,
	};
};

export const deleteEventCategorySuccess = (response) => {
	return {
		payload: response,
		type: DELETE_EVENT_CATEGORY_SUCCESS,
	};
};

export const deleteEventCategoryFailure = (response) => {
	return {
		payload: response,
		type: DELETE_EVENT_CATEGORY_FAILURE,
	};
};

export const deleteMusicCategory = (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_MUSIC_CATEGORY,
	};
};

export const deleteMusicCategorySuccess = (response) => {
	return {
		payload: response,
		type: DELETE_MUSIC_CATEGORY_SUCCESS,
	};
};

export const deleteMusicCategoryFailure = (response) => {
	return {
		payload: response,
		type: DELETE_MUSIC_CATEGORY_FAILURE,
	};
};

export const addEventCategory = (data) => {
	console.log('object', data);
	return {
		payload: data,
		type: ADD_EVENT_CATEGORY,
	};
};

export const addEventCategorySuccess = (response) => {
	return {
		payload: response,
		type: ADD_EVENT_CATEGORY_SUCCESS,
	};
};

export const addEventCategoryFailure = (response) => {
	return {
		payload: response,
		type: ADD_EVENT_CATEGORY_FAILURE,
	};
};

export const editEventCategory = (data) => {
	return {
		payload: data,
		type: EDIT_EVENT_CATEGORY,
	};
};

export const editEventCategorySuccess = (response) => {
	return {
		payload: response,
		type: EDIT_EVENT_CATEGORY_SUCCESS,
	};
};

export const editEventCategoryFailure = (response) => {
	return {
		payload: response,
		type: EDIT_EVENT_CATEGORY_FAILURE,
	};
};

export const addMusicCategory = (data) => {
	return {
		payload: data,
		type: ADD_MUSIC_CATEGORY,
	};
};

export const addMusicCategorySuccess = (response) => {
	return {
		payload: response,
		type: ADD_MUSIC_CATEGORY_SUCCESS,
	};
};

export const addMusicCategoryFailure = (response) => {
	return {
		payload: response,
		type: ADD_MUSIC_CATEGORY_FAILURE,
	};
};

export const editMusicCategory = (data) => {
	return {
		payload: data,
		type: EDIT_MUSIC_CATEGORY,
	};
};

export const editMusicCategorySuccess = (response) => {
	return {
		payload: response,
		type: EDIT_MUSIC_CATEGORY_SUCCESS,
	};
};

export const editMusicCategoryFailure = (response) => {
	return {
		payload: response,
		type: EDIT_MUSIC_CATEGORY_FAILURE,
	};
};


export const getEventList = () => {
	return {
		type: GET_EVENT_LIST,
	};
};

export const getEventListSuccess = (response) => {
	console.log("response.data",response)
	
	return {
		payload: response.data,
		
		type: GET_EVENT_LIST_SUCCESS,
	};
};

export const getEventListFailure = (response) => {
	return {
		payload: response,
		type: GET_EVENT_LIST_FAILURE,
	};
};

export const addEvent = (data) => {
	console.log('object', data);
	return {
		payload: data,
		type: ADD_EVENT,
	};
};

export const addEventSuccess = (response) => {
	return {
		payload: response,
		type: ADD_EVENT_SUCCESS,
	};
};

export const addEventFailure = (response) => {
	return {
		payload: response,
		type: ADD_EVENT_FAILURE,
	};
};

export const deleteEvent= (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_EVENT
	};
};

export const deleteEventSuccess = (response) => {
	return {
		payload: response,
		type: DELETE_EVENT_SUCCESS,
	};
};

export const deleteEventFailure = (response) => {
	return {
		payload: response,
		type: DELETE_EVENT_FAILURE,
	};
};

export const getInvitEventList = () => {
	return {
		type: GET_INVIT_EVENT_LIST,
	};
};
export const getInvitEventListSuccess = (response) => {
	console.log("response.data",response)
	
	return {
		payload: response.data,
		
		type: GET_INVIT_EVENT_LIST_SUCCESS,
	};
};
export const getInvitEventListFailure = (response) => {
	return {
		payload: response,
		type: GET_INVIT_EVENT_LIST_FAILURE,
	};
};
export const deleteInvitEvent= (data) => {
	if (!data) {
		data = { id: '' };
	}
	return {
		payload: Object.keys(data).map((key) => `${data[key]}`),
		type: DELETE_INVIT_EVENT
	};
};

export const deleteInvitEventSuccess = (response) => {
	return {
		payload: response,
		type: DELETE_INVIT_EVENT_SUCCESS,
	};
};

export const deleteInvitEventFailure = (response) => {
	return {
		payload: response,
		type: DELETE_INVIT_EVENT_FAILURE,
	};
};