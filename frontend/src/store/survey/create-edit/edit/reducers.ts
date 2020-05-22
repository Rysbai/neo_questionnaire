import createReducer from "../../../utils/base";

import {
  EDIT_SURVEY_TYPE_PREFIX,
  RETRIEVE_SURVEY_SUCCESS,
  RETRIEVE_SURVEY_FAIL,
  SAVE_CHANGES_SUCCESS,
  SAVE_CHANGES_FAIL,
  SAVE_CHANGES_IN_PROGRESS,

  RetrieveSurveySuccessAction,
  RetrieveSurveyFailAction,
  EditSurveyState,
  SaveChangesSuccessAction,
  SaveChangesFailAction, SaveChangesInProgress,
} from "./types";
import {BASE_INITIAL_STATE, getBaseCreateEditSurveyReducers} from "../base/reducers";
import {CHANGES_STATUS} from "../base/types";


const INITIAL_STATE: EditSurveyState = {
  ...BASE_INITIAL_STATE,

  saveError: "",
  retrieveSurveyError: "",
  isEdit: true
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

  [SAVE_CHANGES_FAIL]: (state: EditSurveyState, action: SaveChangesFailAction): EditSurveyState => ({
    ...state,
    saveError: action.error
  })
}, INITIAL_STATE);
