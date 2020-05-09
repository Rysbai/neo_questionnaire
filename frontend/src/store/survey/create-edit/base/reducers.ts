import {
  DESCRIPTION,
  IS_ANONYMOUS,
  SET_FIELD_VALUE,
  TITLE,

  BaseCreateEditSurveyState,
  CreateOrEditSurveyState,
  SetFieldValueAction,
} from "./types";


export const BASE_INITIAL_STATE : BaseCreateEditSurveyState = {
  id: "",
  title: "",
  description: "",
  isAnonymous: true,
  isActual: false,
  titleError: "",
  descriptionError: "",
  changesSaved: true
};


export function getBaseCreateEditSurveyReducers(typePrefix: string){
  const getAction = (action: string) => `${typePrefix}/${action}`;

  return {
    [getAction(SET_FIELD_VALUE + TITLE)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        title: action.value,
        changesSaved: false
      }),

    [getAction(SET_FIELD_VALUE + DESCRIPTION)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        description: action.value,
        changesSaved: false
      }),

    [getAction(SET_FIELD_VALUE + IS_ANONYMOUS)]:
      (state: CreateOrEditSurveyState, action: SetFieldValueAction) => ({
        ...state,
        isAnonymous: action.value,
        changesSaved: false
      }),

  }
}
