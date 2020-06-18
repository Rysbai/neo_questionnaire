import {
  SET_FIELD_VALUE,
  DESCRIPTION,
  IS_ANONYMOUS,
  TITLE,
  FieldNameType, IS_OPEN
} from "./types";


export default function (typePrefix: string) {
  const getActionType = (action: string) : string => `${typePrefix}/${action}`;

  const FIELD_ACTION_TYPES = {
    title: getActionType(SET_FIELD_VALUE + TITLE),
    description: getActionType(SET_FIELD_VALUE + DESCRIPTION),
    isAnonymous: getActionType(SET_FIELD_VALUE + IS_ANONYMOUS),
    isOpen: getActionType(SET_FIELD_VALUE + IS_OPEN)
  };


  const setSurveyFieldValue = (fieldName: FieldNameType, value: string | number | null | boolean) => ({
    type: FIELD_ACTION_TYPES[fieldName],
    value
  });



  return {
    setSurveyFieldValue
  }
}
