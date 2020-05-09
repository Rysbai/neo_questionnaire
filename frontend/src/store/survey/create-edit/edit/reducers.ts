import createReducer from "../../../utils/base";

import {
  EDIT_SURVEY_TYPE_PREFIX,
  RETRIEVE_SURVEY_SUCCESS,
  RETRIEVE_SURVEY_FAIL,
  SAVE_CHANGES_SUCCESS,
  SAVE_CHANGES_FAIL,

  RetrieveSurveySuccessAction,
  RetrieveSurveyFailAction,
  EditSurveyState,
  SaveChangesSuccessAction,
  SaveChangesFailAction
} from "./types";
import {BASE_INITIAL_STATE, getBaseCreateEditSurveyReducers} from "../base/reducers";


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

  [SAVE_CHANGES_SUCCESS]: (state: EditSurveyState, action: SaveChangesSuccessAction): EditSurveyState => ({
    ...state,
    changesSaved: true
  }),

  [SAVE_CHANGES_FAIL]: (state: EditSurveyState, action: SaveChangesFailAction): EditSurveyState => ({
    ...state,
    saveError: action.error
  })
}, INITIAL_STATE);
