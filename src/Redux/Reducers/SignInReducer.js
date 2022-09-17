import {
	SIGN_IN,
	SIGN_IN_FAILURE,
	SIGN_IN_SUCCESS,
	REMEMBER_ME,
	TERMS_AND_CONDITIONS,
	TERMS_AND_CONDITIONS_SUCCESS,
	TERMS_AND_CONDITIONS_FAILURE,
} from '../Actiontype';
const initialState = {
	isFetching: false,
	SignInSuccess: false,
	SignInSuccessMessage: '',
	SignInFailure: false,
	SignInFailureMessage: '',
	SignInData: null,
	rememberMe: false,
	email: '',
	TermsAndConditionsData: null,
};
export default function SignInReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isFetching: true,
				SignInSuccess: false,
				SignInSuccessMessage: '',
				SignInFailure: false,
				SignInFailureMessage: '',
				SignInData: null,
				rememberMe: action.rememberMe,
				email: action.rememberMe ? action.payload.email : '',
			};
		case SIGN_IN_SUCCESS:
			localStorage.setItem('sessionId', action.payload.token);
			localStorage.setItem('adminId', action.payload.admin.id);
			localStorage.setItem('Admin', action.payload.admin.fullName);
			return {
				...state,
				isFetching: false,
				SignInSuccess: true,
				SignInSuccessMessage: action.payload.Message,
				SignInData: action.payload,
			};
		case SIGN_IN_FAILURE:
			return {
				...state,
				isFetching: false,
				SignInFailure: true,
				SignInFailureMessage: action.payload.message,
				SignInData: null,
			};
		case REMEMBER_ME:
			return {
				...state,
				rememberMe: action.rememberMe,
			};
		case TERMS_AND_CONDITIONS:
			return {
				...state,
				isFetching: true,
				TermsAndConditionsSuccess: false,
				TermsAndConditionsSuccessMessage: '',
				TermsAndConditionsFailure: false,
				TermsAndConditionsFailureMessage: '',
				TermsAndConditionsData: null,
			};
		case TERMS_AND_CONDITIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				TermsAndConditionsSuccess: true,
				TermsAndConditionsSuccessMessage: action.payload.message,
				TermsAndConditionsData: action.payload,
			};
		case TERMS_AND_CONDITIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				TermsAndConditionsFailure: true,
				TermsAndConditionsFailureMessage: action.payload.message,
				TermsAndConditionsData: null,
			};
		default:
			return {
				...state,
			};
	}
}
