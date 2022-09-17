import { ofType } from 'redux-observable';
import { switchMap, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import routeRules from '../../Routes/routeRules';
import history from '../../Store/history';
import { toast } from 'react-toastify';

import {
	GET_INVIT_EVENT_LIST,
	GET_EVENT_LIST,
	GET_HASHTAG_LIST,
	GET_CATEGORY_LIST,
	DELETE_HASHTAG,
	DELETE_CATEGORY,
	ADD_HASHTAG,
	EDIT_HASHTAG,
	ADD_EVENT,ADD_EVENT_SUCCESS,ADD_EVENT_FAILURE,
	ADD_CATEGORY,
	DELETE_EVENT,
	DELETE_INVIT_EVENT,
	EDIT_CATEGORY,
	GET_EVENT_CATEGORY_LIST,
	GET_MUSIC_CATEGORY_LIST,
	DELETE_EVENT_CATEGORY,
	DELETE_MUSIC_CATEGORY,
	ADD_EVENT_CATEGORY,
	EDIT_EVENT_CATEGORY,
	ADD_MUSIC_CATEGORY,
	EDIT_MUSIC_CATEGORY,
} from '../../Redux/Actiontype';
import { Basepath } from '../../config';
import {
	editEventCategoryFailure,
	editEventCategorySuccess,
	getHashTagListSuccess,
	getHashTagListFailure,
	getCategoryListSuccess,
	getCategoryListFailure,
	deleteHashTagSuccess,
	deleteHashTagFailure,
	deleteCategorySuccess,
	deleteCategoryFailure,
	addHashTagSuccess,
	addHashTagFailure,
	editHashTagSuccess,
	editHashTagFailure,
	addCategorySuccess,
	addCategoryFailure,
	editCategorySuccess,
	editCategoryFailure,
	getEventCategoryListSuccess,
	getEventCategoryListFailure,
	getMusicCategoryListSuccess,
	getMusicCategoryListFailure,
	deleteEventCategorySuccess,
	deleteEventCategoryFailure,
	deleteMusicCategorySuccess,
	deleteMusicCategoryFailure,
	addEventCategorySuccess,
	addEventCategoryFailure,
	addMusicCategorySuccess,
	addMusicCategoryFailure,
	editMusicCategorySuccess,
	editMusicCategoryFailure,
	getEventListSuccess,
	getEventListFailure,
	addEventSuccess,
	addEventFailure,
	deleteEventSuccess,
	deleteEventFailure,
	deleteInvitEventSuccess,deleteInvitEventFailure
} from '../../Redux/Actions/DashboardAction';

export const DeleteHashTagEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_HASHTAG),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/hashtag/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteHashTagSuccess(response.response));
						} else {
							return of(deleteHashTagFailure(response.response));
						}
					})
				)
		)
	);

export const DeleteCategoryEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_CATEGORY),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/category/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteCategorySuccess(response.response));
						} else {
							return of(deleteCategoryFailure(response.response));
						}
					})
				)
		)
	);

export const GetAllHashtagsEpic = (action$) =>
	action$.pipe(
		ofType(GET_HASHTAG_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/hashtags`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getHashTagListSuccess(response.response));
						} else {
							return of(getHashTagListFailure(response.response));
						}
					})
				)
		)
	);

export const GetAllCategoriesEpic = (action$) =>
	action$.pipe(
		ofType(GET_CATEGORY_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/categories`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getCategoryListSuccess(response.response));
						} else {
							return of(getCategoryListFailure(response.response));
						}
					})
				)
		)
	);

export const AddHashTagEpic = (action$) =>
	action$.pipe(
		ofType(ADD_HASHTAG),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/hashtag/create_Hashtag`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(addHashTagSuccess(response.response));
						} else {
							return of(addHashTagFailure(response.response));
						}
					})
				)
		)
	);

export const EditHashTagEpic = (action$) =>
	action$.pipe(
		ofType(EDIT_HASHTAG),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/hashtag/update_Hashtag`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(editHashTagSuccess(response.response));
						} else {
							return of(editHashTagFailure(response.response));
						}
					})
				)
		)
	);

export const AddEventEpic = (action$) =>
	action$.pipe(
		ofType(ADD_EVENT),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/event_details/create_event`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(addEventSuccess(response.response));
						} else {
							return of(addEventFailure(response.response));
						}
					})
				)
		)
	);

	export const AddCategoryEpic = (action$) =>
	action$.pipe(
		ofType(ADD_CATEGORY),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/category/create_category`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(addCategorySuccess(response.response));
						} else {
							return of(addCategoryFailure(response.response));
						}
					})
				)
		)
	);
export const EditCategoryEpic = (action$) =>
	action$.pipe(
		ofType(EDIT_CATEGORY),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/category/update_category`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(editCategorySuccess(response.response));
						} else {
							return of(editCategoryFailure(response.response));
						}
					})
				)
		)
	);

export const GetAllEventCategoriesEpic = (action$) =>
	action$.pipe(
		ofType(GET_EVENT_CATEGORY_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getEventCategory`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getEventCategoryListSuccess(response.response));
						} else {
							return of(getEventCategoryListFailure(response.response));
						}
					})
				)
		)
	);

export const GetAllMusicCategoriesEpic = (action$) =>
	action$.pipe(
		ofType(GET_MUSIC_CATEGORY_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getMusicCategory`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getMusicCategoryListSuccess(response.response));
						} else {
							return of(getMusicCategoryListFailure(response.response));
						}
					})
				)
		)
	);

export const DeleteEventCategoryEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_EVENT_CATEGORY),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/admin/event_categories/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteEventCategorySuccess(response.response));
						} else {
							return of(deleteEventCategoryFailure(response.response));
						}
					})
				)
		)
	);
	export const DeleteEventEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_EVENT),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/admin/events/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteEventSuccess(response.response));
						} else {
							return of(deleteEventFailure(response.response));
						}
					})
				)
		)
	);
	export const DeleteIvitEventEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_INVIT_EVENT),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/admin/invite/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteInvitEventSuccess(response.response));
						} else {
							return of(deleteInvitEventFailure(response.response));
						}
					})
				)
		)
	);
export const DeleteMusicCategoryEpic = (action$) =>
	action$.pipe(
		ofType(DELETE_MUSIC_CATEGORY),
		switchMap((action) =>
			ajax
				.delete(`${Basepath}/api/admin/music_categories/${action.payload}`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(deleteMusicCategorySuccess(response.response));
						} else {
							return of(deleteMusicCategoryFailure(response.response));
						}
					})
				)
		)
	);

export const AddEventCategoryEpic = (action$) =>
	action$.pipe(
		ofType(ADD_EVENT_CATEGORY),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/event_categories`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							history.push(routeRules.eventCategory);
							return of(addEventCategorySuccess(response.response));
						} else {
							return of(addEventCategoryFailure(response.response));
						}
					})
				)
		)
	);

export const EditEventCategoryEpic = (action$) =>
	action$.pipe(
		ofType(EDIT_EVENT_CATEGORY),
		switchMap((action) =>
			ajax
				.put(`${Basepath}/api/event_categories/update_event_category`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(editEventCategorySuccess(response.response));
						} else {
							return of(editEventCategoryFailure(response.response));
						}
					})
				)
		)
	);

export const AddMusicCategoryEpic = (action$) =>
	action$.pipe(
		ofType(ADD_MUSIC_CATEGORY),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/music_categories`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							history.push(routeRules.musicCategory);
							return of(addMusicCategorySuccess(response.response));
						} else {
							return of(addMusicCategoryFailure(response.response));
						}
					})
				)
		)
	);

export const EditMusicCategoryEpic = (action$) =>
	action$.pipe(
		ofType(EDIT_MUSIC_CATEGORY),
		switchMap((action) =>
			ajax
				.post(`${Basepath}/api/admin/updateMusicCategory`, action.payload, {
					'Content-Type': 'application/json',
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(editMusicCategorySuccess(response.response));
						} else {
							return of(editMusicCategoryFailure(response.response));
						}
					})
				)
		)
	);

	export const GetAllEventEpic = (action$) =>
	action$.pipe(
		ofType(GET_EVENT_LIST),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getEvents`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getEventListSuccess(response.response));
						} else {
							return of(getEventListFailure(response.response));
						}
					})
				)
		)
	);

	export const GetAllInvitEventEpic = (action$) =>
	action$.pipe(
		ofType(GET_INVIT_EVENT_LIST,),
		switchMap((action) =>
			ajax
				.get(`${Basepath}/api/admin/getInvitEvents`, {
					authenticate: localStorage.getItem('sessionId'),
				})
				.pipe(
					mergeMap((response) => {
						if (response.response.statusCode === 200) {
							return of(getEventListSuccess(response.response));
						} else {
							return of(getEventListFailure(response.response));
						}
					})
				)
		)
	);