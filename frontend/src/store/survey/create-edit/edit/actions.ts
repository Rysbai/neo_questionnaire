import {lsKeys} from "../../../constants";
import {retrieveSurvey as retrieveSurveyApi} from "../../../../api/survey";
import {
  RETRIEVE_SURVEY_FAIL,
  RETRIEVE_SURVEY_SUCCESS,
  SAVE_CHANGES_FAIL,
  SAVE_CHANGES_IN_PROGRESS,
  SAVE_CHANGES_SUCCESS
} from "./types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../../index";
import {Action} from "redux";

import {editSurvey as editSurveyApi} from "../../../../api/survey";


export const retrieveSurvey = (surveyId: string) => (dispatch: any): void => {
  const token = localStorage.getItem(lsKeys.token);

  retrieveSurveyApi(surveyId, token)
    .then(survey => {
      dispatch({
        type: RETRIEVE_SURVEY_SUCCESS,
        survey
      })
    })
    .catch(() => {
      dispatch({
        type: RETRIEVE_SURVEY_FAIL,
        error: "Что-то пошло не так."
      })
    })
};


export const saveChanges = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: any, getState: any): void => {
  dispatch({
    type: SAVE_CHANGES_IN_PROGRESS
  });

  const token = localStorage.getItem(lsKeys.token);
  const state: RootState = getState();
  const survey = state.editSurvey;

  if (survey.changesSaved) return;

  editSurveyApi(survey, token)
    .then((): void => {
      dispatch({
        type: SAVE_CHANGES_SUCCESS
      });
    })
    .catch(() => {
      dispatch({
        type: SAVE_CHANGES_FAIL,
        error: 'Something is wrong!'
      })
    })
};
