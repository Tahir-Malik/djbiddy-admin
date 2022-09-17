import { ofType } from 'redux-observable';
import { switchMap, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { Basepath } from '../../config';
import routeRules from '../../Routes/routeRules';
import history from '../../Store/history';
import { toast } from 'react-toastify';
import {
	GET_USER_LIST,
	ADD_USER,
	EDIT_USER,
	DELETE_USER,
	GET_USER_DETAILS,
	RESUME_SUSPEND_USER,
	GET_DJ_USER_LIST,
	GET_DJ_USER_DETAILS,
} from '../../Redux/Actiontype';
import {
	AddUserFailure,
	EditUserFailure,
	EditUserSuccess,
	AddUserSuccess,
	getUserListSuccess,
	getUserListFailure,
	deleteUserSuccess,
	deleteUserFailure,
	getUserDetailsSuccess,
	getUserDetailsFailure,
	resumeSuspendUserSuccess,
	resumeSuspendUserFailure,
} from '../../Redux/Actions/UsermanageAction';

export const GetUserListEpic = (action$) =>
	action$.pipe(
		ofType(GET_USER_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getNormalUserList?${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						console.log('response', response);
						if (response.response.statusCode === 200) {
							return of(getUserListSuccess(response.response));
						} else {
							return of(getUserListFailure(response.response));
						}
					})
				)
		)
	);

export const AddUserEpic = (action$) =>
	action$.pipe(
		ofType(ADD_USER),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/admin/addUser`, action.payload, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							history.push(routeRules.usermanagement, toast.success(response.response.Message));
							return of(AddUserSuccess(response.response));
						} else {
							return of(AddUserFailure(response.response));
						}
					})
				)
		)
	);

export const EditUserEpic = (action$) =>
	action$.pipe(
		ofType(EDIT_USER),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/admin/editUser`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(EditUserSuccess(response.response));
						} else {
							return of(EditUserFailure(response.response));
						}
					})
				)
		)
	);

export const DeleteUserEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_USER),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/user/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteUserSuccess(response.response));
						} else {
							return of(deleteUserFailure(response.response));
						}
					})
				)
		)
	);

export const ResumeSuspendUserEpic = (action$) =>
	action$.pipe(
		ofType(RESUME_SUSPEND_USER),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/suspendUser?${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(resumeSuspendUserSuccess(response.response));
						} else {
							return of(resumeSuspendUserFailure(response.response));
						}
					})
				)
		)
	);

export const GetUserDetailsEpic = (action$) =>
	action$.pipe(
		ofType(GET_USER_DETAILS),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getNormalUserDetails?${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getUserDetailsSuccess(response.response));
						} else {
							return of(getUserDetailsFailure(response.response));
						}
					})
				)
		)
	);

export const GetDjUserListEpic = (action$) =>
	action$.pipe(
		ofType(GET_DJ_USER_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getDjUserList?${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						console.log('response', response);
						if (response.response.statusCode === 200) {
							return of(getUserListSuccess(response.response));
						} else {
							return of(getUserListFailure(response.response));
						}
					})
				)
		)
	);

export const GetDjUserDetailsEpic = (action$) =>
	action$.pipe(
		ofType(GET_DJ_USER_DETAILS),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getDjUserDetails?${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getUserDetailsSuccess(response.response));
						} else {
							return of(getUserDetailsFailure(response.response));
						}
					})
				)
		)
	);
