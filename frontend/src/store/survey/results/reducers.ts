import createReducer from "../../utils/base";
import {
  QUESTION_RESULT_CHANGE, QuestionResultChange, QuestionResultWithChartData,
  RETRIEVE_SURVEY_INFO_FAIL,
  RETRIEVE_SURVEY_INFO_SUCCESS, RETRIEVE_SURVEY_RESULTS_FAIL, RETRIEVE_SURVEY_RESULTS_SUCCESS,
  RetrieveSurveyInfoSuccess, RetrieveSurveyResultsSuccess,
  SurveyResultInitialState
} from "./types";
import {BasicFailAction} from "../../base_types";



const INITIAL_STATE: SurveyResultInitialState = {
  survey: {
    id: "",
    title: "",
    description: "",
    questions: [],
    isAnonymous: false,
    isActual: true,
    isOpen: false,
  },
  results: [],
  retrieveSurveyError: null,
  retrieveSurveyResultsError: null,
  socketConnectError: null
};


export const surveyResults = createReducer({
  [RETRIEVE_SURVEY_INFO_SUCCESS]: (state: SurveyResultInitialState, action: RetrieveSurveyInfoSuccess): SurveyResultInitialState => ({
    ...state,
    survey: action.survey
  }),
  [RETRIEVE_SURVEY_RESULTS_SUCCESS]: (state: SurveyResultInitialState, action: RetrieveSurveyResultsSuccess): SurveyResultInitialState => ({
    ...state,
    results: action.results
  }),
  [QUESTION_RESULT_CHANGE]: (state: SurveyResultInitialState, action: QuestionResultChange): SurveyResultInitialState => ({
    ...state,
    results: [
      ...updateResults(state.results, action.result)
    ]
  }),
  [RETRIEVE_SURVEY_INFO_FAIL]: (state: SurveyResultInitialState, action: BasicFailAction): SurveyResultInitialState => ({
    ...state,
    retrieveSurveyError: action.error
  }),
  [RETRIEVE_SURVEY_RESULTS_FAIL]: (state: SurveyResultInitialState, action: BasicFailAction): SurveyResultInitialState => ({
    ...state,
    retrieveSurveyResultsError: action.error
  })
}, INITIAL_STATE);



function updateResults(results: Array<QuestionResultWithChartData>, updateResult: QuestionResultWithChartData): Array<QuestionResultWithChartData> {
  const updatedResults = results.map((questionResult):QuestionResultWithChartData => {
    if (updateResult.id === questionResult.id) {
      return updateResult
    }
    return questionResult;
  });
  return updatedResults;
}
