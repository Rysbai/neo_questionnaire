import {CreateSurveyState} from "../create/types";
import {Survey} from "../../../../api/types";

export const SET_FIELD_VALUE = "SET_";
export const TITLE = "TITLE";
export const DESCRIPTION = "DESCRIPTION";
export const IS_ANONYMOUS = "IS_ANONYMOUS";


export interface SetFieldValueAction {
  type: string,
  value: string | number | null | boolean
}


export interface FieldErrorAction {
  type: string,
  value: string
}


export interface BaseCreateEditSurveyState extends Survey {
  titleError: string,
  descriptionError: string,
  changesSaved: boolean
}


export type CreateOrEditSurveyState = CreateSurveyState;

export type FieldNameType = 'title' | 'description' | 'isAnonymous';



