import {
  retrieveSurvey as retrieveSurveyApi,
  createNewQuestion as createNewQuestionApi,
  editQuestion,
  createNewOption as createNewOptionApi
} from "../../../../api/survey";
import {
  CREATE_NEW_OPTION_FAIL,
  CREATE_NEW_OPTION_SUCCESS,
  CREATE_NEW_QUESTION_SUCCESS, EDIT_OPTION_PAYLOAD, EditOptionPayloadAction, InitialOption,
  InitialQuestion, QUESTION_FIELD_NAME_ACTION_TYPE, QuestionFieldName,
  RETRIEVE_SURVEY_FAIL,
  RETRIEVE_SURVEY_SUCCESS,
  SAVE_CHANGES_FAIL,
  SAVE_CHANGES_IN_PROGRESS,
  SAVE_CHANGES_SUCCESS
} from "./types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../index";
import {Action} from "redux";

import {editSurvey as editSurveyApi} from "../../../../api/survey";
import {Option, Question} from "../../../../api/types";
import {Dispatch, GetState} from "../../../base_types";
import {CHANGES_STATUS} from "../base/types";


export const retrieveSurvey = (surveyId: string) => (dispatch: any): void => {

  retrieveSurveyApi(surveyId)
    .then(survey => {
      dispatch({
        type: RETRIEVE_SURVEY_SUCCESS,
        survey
      })
    })
    .catch(() => {
      dispatch({
        type: RETRIEVE_SURVEY_FAIL,
        error: "Что-то пошло не так."
      })
    })
};


export const saveChanges = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: any, getState: any): void => {
  const state: RootState = getState();
  const survey = state.editSurvey;
  if (survey.changesStatus === CHANGES_STATUS.__saved) return;

  dispatch({
    type: SAVE_CHANGES_IN_PROGRESS
  });

  editSurveyApi(survey)
    .then((): void => {
      saveQuestionChanges(dispatch, getState)
        .then((): void => {
          dispatch({
            type: SAVE_CHANGES_SUCCESS
          });
        })
        .catch((): void => {
          dispatch({
            type: SAVE_CHANGES_FAIL,
            error: 'Something is wrong!'
          })
        })
    })
    .catch(() => {
      dispatch({
        type: SAVE_CHANGES_FAIL,
        error: 'Something is wrong!'
      })
    })
};


export const saveQuestionChanges = async (dispatch: any, getState: GetState): Promise<any> => {
  const state = getState();
  const {unsavedQuestions: unsavedQuestionIndexes, questions} = state.editSurvey;

  return Promise.all(unsavedQuestionIndexes.map((questionIndex: number) => {
    const question = questions[questionIndex];
    if (!question) return 'ok';

    editQuestion(question)
      .catch((e) => {
        // pass
      });

    return 'ok';
  }))
};



export const createNewQuestion = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: any, getState: any): void => {
  dispatch({
    type: SAVE_CHANGES_IN_PROGRESS
  });

  const state: RootState = getState();
  const survey = state.editSurvey;
  const questionData = InitialQuestion(survey.id);

  createNewQuestionApi(questionData)
    .then((question: Question) => {
      dispatch({
        type: CREATE_NEW_QUESTION_SUCCESS,
        question
      });

      dispatch({
        type: SAVE_CHANGES_SUCCESS
      })
    })
    .catch(error => {
      dispatch({
        type: SAVE_CHANGES_FAIL,
        error
      })
    })
};


export const setQuestionFieldValue =
  (index: number, fieldName: QuestionFieldName, value: string | boolean) => ({
    type: QUESTION_FIELD_NAME_ACTION_TYPE(fieldName),
    index,
    fieldName,
    value
  });



export const createNewOption = (questionId: string | number): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: Dispatch, getState: GetState): void => {
  const newOption: Option = {
    ...InitialOption,
    questionId
  };

  createNewOptionApi(newOption)
    .then((option): void => {
      dispatch({
        type: CREATE_NEW_OPTION_SUCCESS,
        option
      })
    })
    .catch((error): void=> {
      dispatch({
        type: CREATE_NEW_OPTION_FAIL,
        error
      })
    })
};


export const editOptionPayload = (questionIndex: number, optionIndex: number, payload: string): EditOptionPayloadAction => ({
  type: EDIT_OPTION_PAYLOAD,
  questionIndex,
  optionIndex,
  payload
});
