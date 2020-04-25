import {
  SET_FIELD_VALUE,
  DESCRIPTION,
  END_AT,
  IS_ANONYMOUS,
  START_AT,
  TITLE,
  FieldNameType
} from "./types";


export default function (typePrefix: string) {
  const getActionType = (action: string) : string => `${typePrefix}/${action}`;

  const FIELD_ACTION_TYPES = {
    title: getActionType(SET_FIELD_VALUE + TITLE),
    description: getActionType(SET_FIELD_VALUE + DESCRIPTION),
    isAnonymous: getActionType(SET_FIELD_VALUE + IS_ANONYMOUS),
    startAt: getActionType(SET_FIELD_VALUE + START_AT),
    endAt: getActionType(SET_FIELD_VALUE + END_AT)
  };


  const setSurveyFieldValue = (fieldName: FieldNameType, value: string | number | null | boolean) => ({
    type: FIELD_ACTION_TYPES[fieldName],
    value
  });



  return {
    setSurveyFieldValue
  }
}
