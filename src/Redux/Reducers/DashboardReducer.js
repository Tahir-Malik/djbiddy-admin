import {
	ADD_EVENT,ADD_EVENT_SUCCESS,ADD_EVENT_FAILURE,
	GET_EVENT_LIST,
	GET_EVENT_LIST_SUCCESS,
	GET_EVENT_LIST_FAILURE,
	GET_HASHTAG_LIST,
	GET_HASHTAG_LIST_SUCCESS,
	GET_HASHTAG_LIST_FAILURE,
	GET_CATEGORY_LIST,
	GET_CATEGORY_LIST_SUCCESS,
	GET_CATEGORY_LIST_FAILURE,
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
	DELETE_HASHTAG,
	DELETE_HASHTAG_SUCCESS,
	DELETE_HASHTAG_FAILURE,
	DELETE_CATEGORY,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAILURE,
	DELETE_EVENT_CATEGORY,
	DELETE_EVENT_CATEGORY_SUCCESS,
	DELETE_EVENT_CATEGORY_FAILURE,
	DELETE_MUSIC_CATEGORY,
	DELETE_MUSIC_CATEGORY_SUCCESS,
	DELETE_MUSIC_CATEGORY_FAILURE,
	GET_EVENT_CATEGORY_LIST,
	GET_EVENT_CATEGORY_LIST_SUCCESS,
	GET_EVENT_CATEGORY_LIST_FAILURE,
	GET_MUSIC_CATEGORY_LIST,
	GET_MUSIC_CATEGORY_LIST_SUCCESS,
	GET_MUSIC_CATEGORY_LIST_FAILURE,
	EDIT_EVENT_CATEGORY,
	EDIT_EVENT_CATEGORY_SUCCESS,
	EDIT_EVENT_CATEGORY_FAILURE,
	EDIT_MUSIC_CATEGORY,
	EDIT_MUSIC_CATEGORY_SUCCESS,
	EDIT_MUSIC_CATEGORY_FAILURE,
	DELETE_EVENT,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAILURE,
	DELETE_INVIT_EVENT,DELETE_INVIT_EVENT_SUCCESS,DELETE_INVIT_EVENT_FAILURE,
	GET_INVIT_EVENT_LIST,
	GET_INVIT_EVENT_LIST_SUCCESS,
	GET_INVIT_EVENT_LIST_FAILURE,
} from '../Actiontype';

const initialState = {
	isFetching: false,
	HashTagListSuccess: false,
	HashTagListSuccessMessage: '',
	HashTagListFailure: false,
	HashTagListFailureMessage: '',
	HashTagListData: null,
	CategoryListSuccess: false,
	CategoryListSuccessMessage: '',
	CategoryListFailure: false,
	CategoryListFailureMessage: '',
	CategoryListData: null,
	AddorEditHashTagSuccess: false,
	AddorEditHashTagSuccessMessage: '',
	AddorEditHashTagFailure: false,
	AddorEditHashTagFailureMessage: '',
	AddorEditCategorySuccess: false,
	AddorEditCategorySuccessMessage: '',
	AddorEditCategoryFailure: false,
	AddorEditCategoryFailureMessage: '',

	DeleteSuccess: false,
	DeleteSuccessMessage: '',
	DeleteFailure: false,
	DeleteFailureMessage: '',

	EventCategoryListSuccess: false,
	EventCategoryListSuccessMessage: '',
	EventCategoryListFailure: false,
	EventCategoryListFailureMessage: '',
	EventCategoryListData: null,
	AddorEditEventCategorySuccess: false,
	AddorEditEventCategorySuccessMessage: '',
	AddorEditEventCategoryFailure: false,
	AddorEditEventCategoryFailureMessage: '',

	MusicCategoryListSuccess: false,
	MusicCategoryListSuccessMessage: '',
	MusicCategoryListFailure: false,
	MusicCategoryListFailureMessage: '',
	MusicCategoryListData: null,
	AddorEditMusicCategorySuccess: false,
	AddorEditMusicCategorySuccessMessage: '',
	AddorEditMusicCategoryFailure: false,
	AddorEditMusicCategoryFailureMessage: '',
};
export default function DashBoardReducer(state = initialState, action) {
	// console.log("actionaction",action)
	switch (action.type) {
		case GET_HASHTAG_LIST:
			return {
				...state,
				isFetching: true,
				HashTagListSuccess: false,
				HashTagListSuccessMessage: '',
				HashTagListFailure: false,
				HashTagListFailureMessage: '',
				HashTagListData: null,
			};
		case GET_HASHTAG_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				HashTagListSuccess: true,
				HashTagListSuccessMessage: action.payload.message,
				HashTagListData: action.payload,
			};
		case GET_HASHTAG_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				HashTagListFailure: true,
				HashTagListFailureMessage: action.payload.message,
				HashTagListData: [],
			};
		case GET_CATEGORY_LIST:
			return {
				...state,
				isFetching: true,
				CategoryListSuccess: false,
				CategoryListSuccessMessage: '',
				CategoryListFailure: false,
				CategoryListFailureMessage: '',
				CategoryListData: null,
			};
		case GET_CATEGORY_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				CategoryListSuccess: true,
				CategoryListSuccessMessage: action.payload.message,
				CategoryListData: action.payload,
			};
		case GET_CATEGORY_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				CategoryListFailure: true,
				CategoryListFailureMessage: action.payload.message,
				CategoryListData: [],
			};
		case ADD_HASHTAG:
			return {
				...state,
				isFetching: true,
				AddorEditHashTagSuccess: false,
				AddorEditHashTagSuccessMessage: '',
				AddorEditHashTagFailure: false,
				AddorEditHashTagFailureMessage: '',
			};
		case ADD_HASHTAG_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditHashTagSuccess: true,
				AddorEditHashTagSuccessMessage: action.payload.message,
			};
		case ADD_HASHTAG_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditHashTagFailure: true,
				AddorEditHashTagFailureMessage: action.payload.message,
			};
		case EDIT_HASHTAG:
			return {
				...state,
				isFetching: true,
				AddorEditHashTagSuccess: false,
				AddorEditHashTagSuccessMessage: '',
				AddorEditHashTagFailure: false,
				AddorEditHashTagFailureMessage: '',
			};
		case EDIT_HASHTAG_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditHashTagSuccess: true,
				AddorEditHashTagSuccessMessage: action.payload.message,
			};
		case EDIT_HASHTAG_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditHashTagFailure: true,
				AddorEditHashTagFailureMessage: action.payload.message,
			};


			case ADD_CATEGORY:
			return {
				...state,
				isFetching: true,
				AddorEditCategorySuccess: false,
				AddorEditCategorySuccessMessage: '',
				AddorEditCategoryFailure: false,
				AddorEditCategoryFailureMessage: '',
			};
		case ADD_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditCategorySuccess: true,
				AddorEditCategorySuccessMessage: action.payload.message,
			};
		case ADD_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditCategoryFailure: true,
				AddorEditCategoryFailureMessage: action.payload.message,
			};

			
		case ADD_EVENT:
			return {
				...state,
				isFetching: true,
				AddorEditEventCategorySuccess: false,
				AddorEditEventCategorySuccessMessage: '',
				AddorEditEventCategoryFailure: false,
				AddorEditEventCategoryFailureMessage: '',
			};
		case ADD_EVENT_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditEventCategorySuccess: true,
				AddorEditEventCategorySuccessMessage: action.payload.message,
			};
		case ADD_EVENT_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditCategoryFailure: true,
				AddorEditEventCategoryFailureMessage: action.payload.message,
			};
		case EDIT_CATEGORY:
			return {
				...state,
				isFetching: true,
				AddorEditCategorySuccess: false,
				AddorEditCategorySuccessMessage: '',
				AddorEditCategoryFailure: false,
				AddorEditCategoryFailureMessage: '',
			};
		case EDIT_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditCategorySuccess: true,
				AddorEditCategorySuccessMessage: action.payload.message,
			};
		case EDIT_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditCategoryFailure: true,
				AddorEditCategoryFailureMessage: action.payload.message,
			};
		case DELETE_HASHTAG:
			return {
				...state,
				isFetching: true,
				DeleteSuccess: false,
				DeleteSuccessMessage: '',
				DeleteFailure: false,
				DeleteFailureMessage: '',
			};
		case DELETE_HASHTAG_SUCCESS:
			return {
				...state,
				isFetching: false,
				DeleteSuccess: true,
				DeleteSuccessMessage: action.payload.message,
			};
		case DELETE_HASHTAG_FAILURE:
			return {
				...state,
				isFetching: false,
				DeleteFailure: true,
				DeleteFailureMessage: action.payload.message,
			};
		case DELETE_CATEGORY:
			return {
				...state,
				isFetching: true,
				DeleteSuccess: false,
				DeleteSuccessMessage: '',
				DeleteFailure: false,
				DeleteFailureMessage: '',
			};
		case DELETE_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				DeleteSuccess: true,
				DeleteSuccessMessage: action.payload.message,
			};
		case DELETE_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				DeleteFailure: true,
				DeleteFailureMessage: action.payload.message,
			};

		case DELETE_EVENT_CATEGORY:
			return {
				...state,
				isFetching: true,
				DeleteSuccess: false,
				DeleteSuccessMessage: '',
				DeleteFailure: false,
				DeleteFailureMessage: '',
			};
		case DELETE_EVENT_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				DeleteSuccess: true,
				DeleteSuccessMessage: action.payload.message,
			};
		case DELETE_EVENT_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				DeleteFailure: true,
				DeleteFailureMessage: action.payload.message,
			};

		case DELETE_MUSIC_CATEGORY:
			return {
				...state,
				isFetching: true,
				DeleteSuccess: false,
				DeleteSuccessMessage: '',
				DeleteFailure: false,
				DeleteFailureMessage: '',
			};
		case DELETE_MUSIC_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				DeleteSuccess: true,
				DeleteSuccessMessage: action.payload.message,
			};
		case DELETE_MUSIC_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				DeleteFailure: true,
				DeleteFailureMessage: action.payload.message,
			};

		case GET_EVENT_CATEGORY_LIST:
			return {
				...state,
				isFetching: true,
				EventCategoryListSuccess: false,
				EventCategoryListSuccessMessage: '',
				EventCategoryListFailure: false,
				EventCategoryListFailureMessage: '',
				EventCategoryListData: null,
			};
		case GET_EVENT_CATEGORY_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				EventCategoryListSuccess: true,
				EventCategoryListSuccessMessage: action.payload.message,
				EventCategoryListData: action.payload,
			};
		case GET_EVENT_CATEGORY_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				EventCategoryListFailure: true,
				EventCategoryListFailureMessage: action.payload.message,
				EventCategoryListData: [],
			};

		case GET_MUSIC_CATEGORY_LIST:
			return {
				...state,
				isFetching: true,
				MusicCategoryListSuccess: false,
				MusicCategoryListSuccessMessage: '',
				MusicCategoryListFailure: false,
				MusicCategoryListFailureMessage: '',
				MusicCategoryListData: null,
			};
		case GET_MUSIC_CATEGORY_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				MusicCategoryListSuccess: true,
				MusicCategoryListSuccessMessage: action.payload.message,
				MusicCategoryListData: action.payload,
			};
		case GET_MUSIC_CATEGORY_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				MusicCategoryListFailure: true,
				MusicCategoryListFailureMessage: action.payload.message,
				MusicCategoryListData: [],
			};

		case EDIT_EVENT_CATEGORY:
			return {
				...state,
				isFetching: true,
				AddorEditEventCategorySuccess: false,
				AddorEditEventCategorySuccessMessage: '',
				AddorEditEventCategoryFailure: false,
				AddorEditEventCategoryFailureMessage: '',
			};
		case EDIT_EVENT_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditEventCategorySuccess: true,
				AddorEditEventCategorySuccessMessage: action.payload.message,
			};
		case EDIT_EVENT_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditEventCategoryFailure: true,
				AddorEditEventCategoryFailureMessage: action.payload.message,
			};

		case EDIT_MUSIC_CATEGORY:
			return {
				...state,
				isFetching: true,
				AddorEditMusicCategorySuccess: false,
				AddorEditMusicCategorySuccessMessage: '',
				AddorEditMusicCategoryFailure: false,
				AddorEditMusicCategoryFailureMessage: '',
			};
		case EDIT_MUSIC_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				AddorEditMusicCategorySuccess: true,
				AddorEditMusicCategorySuccessMessage: action.payload.message,
			};
		case EDIT_MUSIC_CATEGORY_FAILURE:
			return {
				...state,
				isFetching: false,
				AddorEditMusicCategoryFailure: true,
				AddorEditMusicCategoryFailureMessage: action.payload.message,
			};
			
		case GET_EVENT_LIST:
			return {
				...state,
				isFetching: true,
				CategoryListSuccess: false,
				CategoryListSuccessMessage: '',
				CategoryListFailure: false,
				CategoryListFailureMessage: '',
				CategoryListData: null,
			};
		case GET_EVENT_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				CategoryListSuccess: true,
				CategoryListSuccessMessage: action.payload.message,
				CategoryListData: action.payload,
			};
		case GET_EVENT_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				CategoryListFailure: true,
				CategoryListFailureMessage: action.payload.message,
				CategoryListData: [],
			};
			case DELETE_EVENT:
				return {
					...state,
					isFetching: true,
					DeleteSuccess: false,
					DeleteSuccessMessage: '',
					DeleteFailure: false,
					DeleteFailureMessage: '',
				};
			case DELETE_EVENT_SUCCESS:
				return {
					...state,
					isFetching: false,
					DeleteSuccess: true,
					DeleteSuccessMessage: action.payload.message,
				};
			case DELETE_EVENT_FAILURE:
				return {
					...state,
					isFetching: false,
					DeleteFailure: true,
					DeleteFailureMessage: action.payload.message,
				};
				
				case GET_INVIT_EVENT_LIST:
			return {
				...state,
				isFetching: true,
				CategoryListSuccess: false,
				CategoryListSuccessMessage: '',
				CategoryListFailure: false,
				CategoryListFailureMessage: '',
				CategoryListData: null,
			};
		case GET_INVIT_EVENT_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				CategoryListSuccess: true,
				CategoryListSuccessMessage: action.payload.message,
				CategoryListData: action.payload,
			};
		case GET_INVIT_EVENT_LIST_FAILURE:
			return {
				...state,
				isFetching: false,
				CategoryListFailure: true,
				CategoryListFailureMessage: action.payload.message,
				CategoryListData: [],
			};
			case DELETE_INVIT_EVENT:
				return {
					...state,
					isFetching: true,
					DeleteSuccess: false,
					DeleteSuccessMessage: '',
					DeleteFailure: false,
					DeleteFailureMessage: '',
				};
			case DELETE_INVIT_EVENT_SUCCESS:
				return {
					...state,
					isFetching: false,
					DeleteSuccess: true,
					DeleteSuccessMessage: action.payload.message,
				};
			case GET_INVIT_EVENT_LIST_FAILURE:
				return {
					...state,
					isFetching: false,
					DeleteFailure: true,
					DeleteFailureMessage: action.payload.message,
				};
				
		default:
			return {
				...state,
			};
	}
}
