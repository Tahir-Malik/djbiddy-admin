import { ofType } from "redux-observable";
import { switchMap, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { Basepath } from "../../config";
import { GET_POST_LIST, DELETE_POST, GET_POST_DETAILS } from "../../Redux/Actiontype";
import {
    getPostListSuccess, getPostListFailure, deletePostSuccess, deletePostFailure, getPostDetailsSuccess, getPostDetailsFailure
} from "../../Redux/Actions/PostManageAction";


export const GetPostListEpic = action$ =>
    action$.pipe(
        ofType(GET_POST_LIST),
        switchMap(action =>
            ajax
                .get(`${Basepath}/api/admin/getPostList?${action.payload}`, {
                    authenticate: localStorage.getItem("sessionId")
                })
                .pipe(
                    mergeMap(response => {
                        console.log("response", response)
                        if (response.response.statusCode === 200) {
                            return of(getPostListSuccess(response.response));
                        } else {
                            return of(getPostListFailure(response.response));
                        }
                    })
                )
        )
    );

export const DeletePostEpic = action$ =>
    action$.pipe(
        ofType(DELETE_POST),
        switchMap(action =>
            ajax
                .delete(`${Basepath}/api/post/${action.payload}`, {
                    authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(deletePostSuccess(response.response));
                        } else {
                            return of(deletePostFailure(response.response));
                        }
                    })
                )
        )
    );

export const GetPostDetailsEpic = action$ =>
    action$.pipe(
        ofType(GET_POST_DETAILS),
        switchMap(action =>
            ajax
                .get(`${Basepath}/api/admin/getPostDetails?${action.payload}`, {
                    authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(getPostDetailsSuccess(response.response));
                        } else {
                            return of(getPostDetailsFailure(response.response));
                        }
                    })
                )
        )
    );