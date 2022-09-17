import { ofType } from "redux-observable";
import { switchMap, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { Basepath } from "../../config";
import routeRules from "../../Routes/routeRules";
import history from "../../Store/history";
import { toast } from "react-toastify";
import { GET_CHALLENGE_LIST, ADD_CHALLENGE, EDIT_CHALLENGE, DELETE_CHALLENGE, GET_CHALLENGE_DETAILS, GET_USER_CHALLENGE_LIST, DELETE_USER_CHALLENGE, GET_USER_CHALLENGE_DETAILS } from "../../Redux/Actiontype";
import {
    AddChallengeFailure, EditChallengeFailure, EditChallengeSuccess, AddChallengeSuccess, getChallengeListSuccess, getChallengeListFailure,
    deleteChallengeSuccess, deleteChallengeFailure, getChallengeDetailsSuccess, getChallengeDetailsFailure, getUserChallengeListSuccess, getUserChallengeListFailure,
    deleteUserChallengeSuccess, deleteUserChallengeFailure, getUserChallengeDetailsSuccess, getUserChallengeDetailsFailure
} from "../../Redux/Actions/ChallengeManageAction";


export const GetChallengeListEpic = action$ =>
    action$.pipe(
        ofType(GET_CHALLENGE_LIST),
        switchMap(action =>
            ajax
                .get(`${Basepath}/api/admin/getChallengeList?${action.payload}`, {
                    authenticate: localStorage.getItem("sessionId")
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(getChallengeListSuccess(response.response));
                        } else {
                            return of(getChallengeListFailure(response.response));
                        }
                    })
                )
        )
    );

export const AddChallengeEpic = action$ =>
    action$.pipe(
        ofType(ADD_CHALLENGE),
        switchMap(action =>
            ajax
                .post(`${Basepath}/api/challenge/create`, action.payload, {
                    authenticate: localStorage.getItem("sessionId")
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            history.push(routeRules.challengemanagement, toast.success(response.response.Message))
                            return of(AddChallengeSuccess(response.response))
                        } else {
                            return of(AddChallengeFailure(response.response));
                        }
                    })
                )
        )
    );

export const EditChallengeEpic = action$ =>
    action$.pipe(
        ofType(EDIT_CHALLENGE),
        switchMap(action =>
            ajax
                .post(`${Basepath}/api/challenge/update`, action.payload, {
                    "Content-Type": "application/json", authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(EditChallengeSuccess(response.response))
                        } else {
                            return of(EditChallengeFailure(response.response));
                        }
                    })
                )
        )
    );

export const DeleteChallengeEpic = action$ =>
    action$.pipe(
        ofType(DELETE_CHALLENGE),
        switchMap(action =>
            ajax
                .delete(`${Basepath}/api/challenge/${action.payload}`, {
                    authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(deleteChallengeSuccess(response.response));
                        } else {
                            return of(deleteChallengeFailure(response.response));
                        }
                    })
                )
        )
    );

export const GetChallengeDetailsEpic = action$ =>
    action$.pipe(
        ofType(GET_CHALLENGE_DETAILS),
        switchMap(action =>
            ajax
                .get(`${Basepath}/api/admin/getChallengeDetails?${action.payload}`, {
                    authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(getChallengeDetailsSuccess(response.response));
                        } else {
                            return of(getChallengeDetailsFailure(response.response));
                        }
                    })
                )
        )
    );

export const GetUserChallengeListEpic = action$ =>
    action$.pipe(
        ofType(GET_USER_CHALLENGE_LIST),
        switchMap(action =>
            ajax
                .get(`${Basepath}/api/admin/getUserChallengeList?${action.payload}`, {
                    authenticate: localStorage.getItem("sessionId")
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(getUserChallengeListSuccess(response.response));
                        } else {
                            return of(getUserChallengeListFailure(response.response));
                        }
                    })
                )
        )
    );

export const DeleteUserChallengeEpic = action$ =>
    action$.pipe(
        ofType(DELETE_USER_CHALLENGE),
        switchMap(action =>
            ajax
                .delete(`${Basepath}/api/post/${action.payload}`, {
                    authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(deleteUserChallengeSuccess(response.response));
                        } else {
                            return of(deleteUserChallengeFailure(response.response));
                        }
                    })
                )
        )
    );

export const GetUserChallengeDetailsEpic = action$ =>
    action$.pipe(
        ofType(GET_USER_CHALLENGE_DETAILS),
        switchMap(action =>
            ajax
                .get(`${Basepath}/api/admin/getUserChallengeDetails?${action.payload}`, {
                    authenticate: localStorage.getItem('sessionId')
                })
                .pipe(
                    mergeMap(response => {
                        if (response.response.statusCode === 200) {
                            return of(getUserChallengeDetailsSuccess(response.response));
                        } else {
                            return of(getUserChallengeDetailsFailure(response.response));
                        }
                    })
                )
        )
    );    