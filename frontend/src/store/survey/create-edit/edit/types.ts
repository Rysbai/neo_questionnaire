import {Option, Question, Survey} from "../../../../api/types";
import {BaseCreateEditSurveyState} from "../base/types";

export const EDIT_SURVEY_TYPE_PREFIX = "EDIT_SURVEY";
export const RETRIEVE_SURVEY_SUCCESS = EDIT_SURVEY_TYPE_PREFIX + "/RETRIEVE_SURVEY_SUCCESS";
export const RETRIEVE_SURVEY_FAIL = EDIT_SURVEY_TYPE_PREFIX + "/RETRIEVE_SURVEY_FAIL";
export const SAVE_CHANGES_SUCCESS = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_SUCCESS";
export const SAVE_CHANGES_IN_PROGRESS = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_IN_PROGRESS";
export const SAVE_CHANGES_FAIL = EDIT_SURVEY_TYPE_PREFIX + "/SAVE_CHANGES_FAIL";
export const CREATE_NEW_QUESTION_SUCCESS = `${EDIT_SURVEY_TYPE_PREFIX}/CREATE_NEW_QUESTION_SUCCESS`;
export const SET_QUESTION_FIELD_VALUE = `${EDIT_SURVEY_TYPE_PREFIX}/SET_QUESTION_FIELD_VALUE`;
export const CREATE_NEW_OPTION_SUCCESS = `${EDIT_SURVEY_TYPE_PREFIX}/CREATE_NEW_OPTION_SUCCESS`;
export const CREATE_NEW_OPTION_FAIL = `${EDIT_SURVEY_TYPE_PREFIX}/CREATE_NEW_OPTION_FAIL`;
export const EDIT_OPTION_PAYLOAD = `${EDIT_SURVEY_TYPE_PREFIX}/EDIT_OPTION_PAYLOAD`;


export const InitialOption: Option = {
  id: null,
  questionId: null,
  payload: "New option"
};

export const InitialQuestion = (surveyId: number | string): Question => ({
  id: undefined,
  surveyId: surveyId,
  payload: "New Question",
  allowMultipleAnswer: false,
  options: [
    InitialOption
  ]
});

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
  type: typeof CREATE_NEW_QUESTION_SUCCESS,
  question: Question
}


export interface EditSurveyState extends BaseCreateEditSurveyState {
  saveError: string,
  retrieveSurveyError: string,
  isEdit: true,
  unsavedQuestions: Array<number>
}


export const QUESTION_FIELD_TYPE = {
  'payload': 'PAYLOAD',
  'allowMultipleAnswer': 'ALLOW_MULTIPLE_ANSWER'
};


export const QUESTION_FIELD_NAME_ACTION_TYPE = (fieldName: QuestionFieldName) => (
  `${SET_QUESTION_FIELD_VALUE}/${QUESTION_FIELD_TYPE[fieldName]}`
);


export type QuestionFieldName = 'payload' | 'allowMultipleAnswer';


export interface SetQuestionFieldAction {
  type: string,
  index: number,
  fieldName: string,
  value: string | boolean
}


export interface CreateNewOptionSuccessAction {
  type: typeof CREATE_NEW_OPTION_SUCCESS,
  option: Option
}


export interface EditOptionPayloadAction {
  type: typeof EDIT_OPTION_PAYLOAD,
  questionIndex: number,
  optionIndex: number,
  payload: string
}