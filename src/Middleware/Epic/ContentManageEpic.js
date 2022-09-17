import { ofType } from "redux-observable";
import { switchMap, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { Basepath } from "../../config";

import {
  ADD_EDIT_CONTENT,
  GET_CONTENT_DATA,
} from "../../Redux/Actiontype";

import {
  AddEditContentSuccess,
  AddEditContentFailure,
  getContentDataSuccess,
  getContentDataFailure
} from "../../Redux/Actions/ContentManageAction";

export const AddEditContentEpic = (action$) =>
  action$.pipe(
    ofType(ADD_EDIT_CONTENT),
    switchMap((action) =>
      ajax
        .post(`${Basepath}/api/admin/createEditContent`, action.payload, {
          authenticate: localStorage.getItem("sessionId")
        })
        .pipe(
          mergeMap((response) => {
            if (response.response.statusCode === 200) {
              return of(AddEditContentSuccess(response.response));
            } else {
              return of(AddEditContentFailure(response.response));
            }
          })
        )
    )
  );

export const getContentDataEpic = (action$) =>
  action$.pipe(
    ofType(GET_CONTENT_DATA),
    switchMap((action) =>
      ajax
        .get(`${Basepath}/api/admin/getContentData`, {
          authenticate: localStorage.getItem("sessionId")
        })
        .pipe(
          mergeMap((response) => {
            if (response.response.statusCode === 200) {
              return of(getContentDataSuccess(response.response));
            } else {
              return of(getContentDataFailure(response.response));
            }
          })
        )
    )
  );
