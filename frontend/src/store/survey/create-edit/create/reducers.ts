import createReducer from "../../../utils/base";

import {
  CREATE_SURVEY_ACTION_TYPE_PREFIX,
  CREATE_SURVEY_FAIL,
  RESET_STATE,
  CreateSurveyFailAction,
  CreateSurveyState,
} from "./types";
import {BASE_INITIAL_STATE, getBaseCreateEditSurveyReducers} from "../base/reducers";


const INITIAL_STATE : CreateSurveyState = {
  ...BASE_INITIAL_STATE,

  createError: ""
};


export const createSurvey = createReducer({
  ...getBaseCreateEditSurveyReducers(CREATE_SURVEY_ACTION_TYPE_PREFIX),
  [CREATE_SURVEY_FAIL]: (state: CreateSurveyState, action: CreateSurveyFailAction) => ({...state, createError: action.error}),
  [RESET_STATE]: () => (INITIAL_STATE)
}, INITIAL_STATE);


