import { ofType } from "redux-observable";
import { switchMap, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { Basepath } from "../../config";
import { UPDATE_ADMIN_PROFILE, FORGOT_PASSWORD, GET_ADMIN_PROFILE, } from "../../Redux/Actiontype";
import { UpdateProfileSuccess, UpdateProfileFailure, GetProfileSuccess, GetProfileFailure, ForgotPasswordSuccess, ForgotPasswordFailure, } from "../../Redux/Actions/ProfileAction";


export const UpdateAdminProfileEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_ADMIN_PROFILE),
    switchMap(action =>
      ajax
        .post(`${Basepath}/api/admin/updateAdminProfile`, action.payload, {
          authenticate: localStorage.getItem("sessionId")
        })
        .pipe(
          mergeMap(response => {
            if (response.response.statusCode === 200) {
              return of(UpdateProfileSuccess(response.response));
            } else {
              return of(UpdateProfileFailure(response.response));
            }
          })
        )
    )
  );

export const GetAdminProfileEpic = action$ =>
  action$.pipe(
    ofType(GET_ADMIN_PROFILE),
    switchMap(action =>
      ajax
        .get(`${Basepath}/api/admin/getAdminProfile`, {
          authenticate: localStorage.getItem("sessionId")
        })
        .pipe(
          mergeMap(response => {
            if (response.response.statusCode === 200) {
              return of(GetProfileSuccess(response.response));
            } else {
              return of(GetProfileFailure(response.response));
            }
          })
        )
    )
  );

export const ForgotPassEpic = action$ =>
  action$.pipe(
    ofType(FORGOT_PASSWORD),
    switchMap(action =>
      ajax
        .post(`${Basepath}/auth/forgot`, action.payload)
        .pipe(
          mergeMap(response => {
            if (response.response.statusCode === 200) {
              return of(ForgotPasswordSuccess(response.response));
            } else {
              return of(ForgotPasswordFailure(response.response));
            }
          })
        )
    )
  );

