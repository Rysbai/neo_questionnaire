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


export const CHANGES_STATUS = {
  __saved: '__saved__',
  __saving: '__saving__',
  __not_saved: '__not_saved__'
};


export interface BaseCreateEditSurveyState extends Survey {
  titleError: string,
  descriptionError: string,
  changesStatus: string
}



export type CreateOrEditSurveyState = CreateSurveyState;

export type FieldNameType = 'title' | 'description' | 'isAnonymous';



