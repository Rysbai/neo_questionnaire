import {Survey} from "../../../../api/types";
import {BaseCreateEditSurveyState} from "../base/types";

export const EDIT_SURVEY_TYPE_PREFIX = "EDIT_SURVEY";
export const RETRIEVE_SURVEY_SUCCESS = EDIT_SURVEY_TYPE_PREFIX + "/RETRIEVE_SURVEY_SUCCESS";
export const RETRIEVE_SURVEY_FAIL = EDIT_SURVEY_TYPE_PREFIX + "/RETRIEVE_SURVEY_FAIL";
export const SAVE_CHANGES_SUCCESS = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_SUCCESS";
export const SAVE_CHANGES_FAIL = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_FAIL";


export interface RetrieveSurveySuccessAction {
  type: typeof RETRIEVE_SURVEY_SUCCESS,
  survey: Survey
}


export interface RetrieveSurveyFailAction {
  type: typeof RETRIEVE_SURVEY_FAIL,
  error: string
}


export interface SaveChangesSuccessAction {
  type: typeof SAVE_CHANGES_SUCCESS
}


export interface SaveChangesFailAction {
  type: typeof SAVE_CHANGES_FAIL,
  error: string
}


export interface EditSurveyState extends BaseCreateEditSurveyState {
  saveError: string,
  retrieveSurveyError: string,
  isEdit: true
}
