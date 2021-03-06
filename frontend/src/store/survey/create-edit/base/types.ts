import {CreateSurveyState} from "../create/types";
import {Survey} from "../../../../api/types";

export const SET_FIELD_VALUE = "SET_";
export const TITLE = "TITLE";
export const DESCRIPTION = "DESCRIPTION";
export const IS_ANONYMOUS = "IS_ANONYMOUS";
export const IS_OPEN = "IS_OPEN";


export interface SetFieldValueAction {
  type: string,
  value: string | number | null | boolean
}


export const CHANGES_STATUS = {
  __saved: '__saved__',
  __saving: '__saving__',
  __not_saved: '__not_saved__',
  __error: '__error__'
};


export interface BaseCreateEditSurveyState extends Survey {
  titleError: string,
  descriptionError: string,
  changesStatus: string
}



export type CreateOrEditSurveyState = CreateSurveyState;

export type FieldNameType = 'title' | 'description' | 'isAnonymous' | 'isOpen';



