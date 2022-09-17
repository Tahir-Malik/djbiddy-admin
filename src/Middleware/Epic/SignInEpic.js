import { ofType } from "redux-observable";
import { switchMap, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import {
  SIGN_IN, TERMS_AND_CONDITIONS
} from "../../Redux/Actiontype";
import { Basepath } from "../../config";
import {
  SignInSuccess,
  SignInFailure, termsAndConditionsSuccess, termsAndConditionsFailure
} from "../../Redux/Actions/SignInAction";

export const SignInEpic = action$ =>
  action$.pipe(
    ofType(SIGN_IN),
    switchMap(action =>
      ajax
        .post(`${Basepath}/auth/login`, action.payload, {
        })
        .pipe(
          mergeMap(response => {
            if (response.response.statusCode === 200) {
              return of(SignInSuccess(response.response));
            } else {
              return of(SignInFailure(response.response));
            }
          })
        )
    )
  );

export const TermsAndConditionsEpic = action$ =>
  action$.pipe(
    ofType(TERMS_AND_CONDITIONS),
    switchMap(action =>
      ajax
        .get(`${Basepath}/api/user/privacy_policy`, {})
        .pipe(
          mergeMap(response => {
            if (response.response.statusCode === 200) {
              return of(termsAndConditionsSuccess(response.response));
            } else {
              return of(termsAndConditionsFailure(response.response));
            }
          })
        )
    )
  );  
