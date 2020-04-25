import {CreateSurveyState} from "../create/types";
import {Survey} from "../../../../api/types";

export const SET_FIELD_VALUE = "SET_";
export const TITLE = "TITLE";
export const DESCRIPTION = "DESCRIPTION";
export const IS_ANONYMOUS = "IS_ANONYMOUS";
export const START_AT = "START_AT";
export const END_AT = "END_AT";


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
  startAtError: string,
  endAtError: string
}


export type CreateOrEditSurveyState = CreateSurveyState;

export type FieldNameType = 'title' | 'description' | 'isAnonymous' | 'startAt' | 'endAt';



