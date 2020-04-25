import {BaseCreateEditSurveyState} from "../base/types";


export const CREATE_SURVEY_ACTION_TYPE_PREFIX = "CREATE_SURVEY";
export const CREATE_SURVEY_FAIL = `${CREATE_SURVEY_ACTION_TYPE_PREFIX}/CREATE_SURVEY_FAIL`;
export const RESET_STATE = `${CREATE_SURVEY_ACTION_TYPE_PREFIX}/RESET_STATE`;


export interface CreateSurveyState extends BaseCreateEditSurveyState {
  createError: ""
}

export interface CreateSurveyFailAction {
  type: typeof CREATE_SURVEY_FAIL,
  error: ""
}

export interface ResetStateAction {
  type: typeof RESET_STATE
}