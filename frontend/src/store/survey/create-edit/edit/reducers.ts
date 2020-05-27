import createReducer from "../../../utils/base";

import {
  EDIT_SURVEY_TYPE_PREFIX,
  RETRIEVE_SURVEY_SUCCESS,
  RETRIEVE_SURVEY_FAIL,
  SAVE_CHANGES_SUCCESS,
  SAVE_CHANGES_FAIL,
  SAVE_CHANGES_IN_PROGRESS,
  CREATE_NEW_QUESTION_SUCCESS,
  QUESTION_FIELD_NAME_ACTION_TYPE,

  RetrieveSurveySuccessAction,
  RetrieveSurveyFailAction,
  EditSurveyState,
  SaveChangesSuccessAction,
  SaveChangesFailAction,
  SaveChangesInProgress,
  CreateNewQuestionSuccess,
  SetQuestionFieldAction,
} from "./types";
import {BASE_INITIAL_STATE, getBaseCreateEditSurveyReducers} from "../base/reducers";
import {CHANGES_STATUS} from "../base/types";
import {Question} from "../../../../api/types";


const INITIAL_STATE: EditSurveyState = {
  ...BASE_INITIAL_STATE,

  saveError: "",
  retrieveSurveyError: "",
  isEdit: true,
  unsavedQuestions: []
};


export const editSurvey = createReducer({
  ...getBaseCreateEditSurveyReducers(EDIT_SURVEY_TYPE_PREFIX),
  [RETRIEVE_SURVEY_SUCCESS]: (state: EditSurveyState, action: RetrieveSurveySuccessAction): EditSurveyState => ({
    ...state,
    ...action.survey
  }),

  [RETRIEVE_SURVEY_FAIL]: (state: EditSurveyState, action: RetrieveSurveyFailAction): EditSurveyState => ({
    ...state,
    retrieveSurveyError: action.error
  }),

  [SAVE_CHANGES_IN_PROGRESS]: (state: EditSurveyState, action: SaveChangesInProgress) => ({
    ...state,
    changesStatus: CHANGES_STATUS.__saving
  }),

  [SAVE_CHANGES_SUCCESS]: (state: EditSurveyState, action: SaveChangesSuccessAction): EditSurveyState => ({
    ...state,
    changesStatus: CHANGES_STATUS.__saved
  }),
  [CREATE_NEW_QUESTION_SUCCESS]: (state: EditSurveyState, action: CreateNewQuestionSuccess) => ({
    ...state,
    questions: [
      ...state.questions,
      action.question
    ]
  }),

  [QUESTION_FIELD_NAME_ACTION_TYPE('payload')]: (state: EditSurveyState, action: SetQuestionFieldAction) => ({
    ...state,
    changesStatus: CHANGES_STATUS.__not_saved,
    questions: [
      ...editQuestion(action, state.questions)
    ],
    unsavedQuestions: [
      ...updateUnsavedQuestions(state.unsavedQuestions, action.index)
    ]
  }),

  [QUESTION_FIELD_NAME_ACTION_TYPE('allowMultipleAnswer')]: (state: EditSurveyState, action: SetQuestionFieldAction) => ({
      ...state,
    changesStatus: CHANGES_STATUS.__not_saved,
    questions: [
        ...editQuestion(action, state.questions)
    ],
    unsavedQuestions: [
      ...updateUnsavedQuestions(state.unsavedQuestions, action.index)
    ]
  }),

  [SAVE_CHANGES_FAIL]: (state: EditSurveyState, action: SaveChangesFailAction): EditSurveyState => ({
    ...state,
    saveError: action.error
  })
}, INITIAL_STATE);


function editQuestion(action: SetQuestionFieldAction, questions: Array<Question>):Array<Question> {
  // @ts-ignore
  questions[action.index][action.fieldName] = action.value;

  return questions
}


function updateUnsavedQuestions(unsavedQuestionIndexes: Array<number>, newIndex: number): Array<number> {
  if (!unsavedQuestionIndexes.includes(newIndex)){
    unsavedQuestionIndexes.push(newIndex)
  }

  return unsavedQuestionIndexes
}