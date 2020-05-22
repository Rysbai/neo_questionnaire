import {Option, Question, Survey} from "../../../../api/types";
import {BaseCreateEditSurveyState} from "../base/types";

export const EDIT_SURVEY_TYPE_PREFIX = "EDIT_SURVEY";
export const RETRIEVE_SURVEY_SUCCESS = EDIT_SURVEY_TYPE_PREFIX + "/RETRIEVE_SURVEY_SUCCESS";
export const RETRIEVE_SURVEY_FAIL = EDIT_SURVEY_TYPE_PREFIX + "/RETRIEVE_SURVEY_FAIL";
export const SAVE_CHANGES_SUCCESS = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_SUCCESS";
export const SAVE_CHANGES_IN_PROGRESS = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_IN_PROGRESS";
export const SAVE_CHANGES_FAIL = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_FAIL";
export const CREATE_NEW_QUESTION_SUCCESS = `${EDIT_SURVEY_TYPE_PREFIX}/CREATE_NEW_QUESTION_SUCCESS`;
export const CREATE_NEW_QUESTION_FAIL = `${EDIT_SURVEY_TYPE_PREFIX}/CREATE_NEW_QUESTION_FAIL`;


export const InitialOption: Option = {
  id: null,
  questionId: null,
  payload: "New option"
};


export const InitialQuestion: Question = {
  id: null,
  payload: "New Question",
  isMultipleChoice: false,
  options: [
    InitialOption
  ]
};

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


export interface SaveChangesInProgress {
  type: typeof SAVE_CHANGES_IN_PROGRESS
}


export interface CreateNewQuestionSuccess {
  type: typeof CREATE_NEW_QUESTION_SUCCESS
}

export interface EditSurveyState extends BaseCreateEditSurveyState {
  saveError: string,
  retrieveSurveyError: string,
  isEdit: true
}
