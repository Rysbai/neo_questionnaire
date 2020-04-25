import {
  BaseCreateEditSurveyState, CreateOrEditSurveyState,
  DESCRIPTION,
  END_AT,
  IS_ANONYMOUS,
  SET_FIELD_VALUE,
  SetFieldValueAction,
  START_AT,
  TITLE
} from "./types";


export const BASE_INITIAL_STATE : BaseCreateEditSurveyState = {
  id: "",
  title: "",
  description: "",
  isAnonymous: true,
  startAt: new Date(),
  endAt: new Date(),

  titleError: "",
  descriptionError: "",
  startAtError: "",
  endAtError: ""
};


export function getBaseCreateEditSurveyReducers(typePrefix: string){
  const getAction = (action: string) => `${typePrefix}/${action}`;

  return {
    [getAction(SET_FIELD_VALUE + TITLE)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({...state, title: action.value}),

    [getAction(SET_FIELD_VALUE + DESCRIPTION)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({...state, description: action.value}),

    [getAction(SET_FIELD_VALUE + IS_ANONYMOUS)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({...state, isAnonymous: action.value}),

    [getAction(SET_FIELD_VALUE + START_AT)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({...state, startAt: action.value}),

    [getAction(SET_FIELD_VALUE + END_AT)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({...state, endAt: action.value}),
  }
}
