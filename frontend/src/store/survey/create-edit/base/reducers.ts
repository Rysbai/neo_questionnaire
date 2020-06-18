import {
  DESCRIPTION,
  IS_ANONYMOUS,
  SET_FIELD_VALUE,
  TITLE,
  CHANGES_STATUS,

  BaseCreateEditSurveyState,
  CreateOrEditSurveyState,
  SetFieldValueAction, IS_OPEN,
} from "./types";


export const BASE_INITIAL_STATE : BaseCreateEditSurveyState = {
  id: "",
  title: "",
  description: "",
  isAnonymous: true,
  isActual: false,
  isOpen: false,
  titleError: "",
  descriptionError: "",
  changesStatus: CHANGES_STATUS.__saved,
  questions: []
};


export function getBaseCreateEditSurveyReducers(typePrefix: string){
  const getAction = (action: string) => `${typePrefix}/${action}`;

  return {
    [getAction(SET_FIELD_VALUE + TITLE)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        title: action.value,
        changesStatus: CHANGES_STATUS.__not_saved
      }),

    [getAction(SET_FIELD_VALUE + DESCRIPTION)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        description: action.value,
        changesStatus: CHANGES_STATUS.__not_saved
      }),

    [getAction(SET_FIELD_VALUE + IS_ANONYMOUS)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        isAnonymous: action.value,
        changesStatus: CHANGES_STATUS.__not_saved
      }),
    [getAction(SET_FIELD_VALUE + IS_OPEN)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        isOpen: action.value,
        changesStatus: CHANGES_STATUS.__not_saved
      }),
  }
}
