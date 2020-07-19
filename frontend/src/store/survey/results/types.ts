import {QuestionResult, Survey} from "../../../api/types";

export const RETRIEVE_SURVEY_INFO_SUCCESS = "SURVEY_RESULTS/RETRIEVE_SURVEY_INFO";
export const CONNECT_TO_SOCKET_SUCCESS = "SURVEY_RESULTS/CONNECT_TO_SOCKET_SUCCESS";
export const RETRIEVE_SURVEY_INFO_FAIL = "SURVEY_RESULTS/RETRIEVE_SURVEY_INFO_FAIL";
export const SOCKET_DISCONNECTED = "SURVEY_RESULTS/SOCKET_DISCONNECTED";
export const RETRIEVE_SURVEY_RESULTS_SUCCESS = "SURVEY_RESULT/RETRIEVE_SURVEY_RESULTS_SUCCESS";
export const RETRIEVE_SURVEY_RESULTS_FAIL = "SURVEY_RESULT/RETRIEVE_SURVEY_RESULTS_FAIL";
export const QUESTION_RESULT_CHANGE = "SURVEY_RESULT/QUESTION_RESULT_CHANGE";


export interface RetrieveSurveyInfoSuccess {
  type: typeof RETRIEVE_SURVEY_INFO_SUCCESS,
  survey: Survey
}


export interface RetrieveSurveyResultsSuccess {
  type: typeof RETRIEVE_SURVEY_RESULTS_SUCCESS,
  results: Array<QuestionResultWithChartData>
}


export interface QuestionResultChange {
  type: typeof QUESTION_RESULT_CHANGE,
  result: QuestionResultWithChartData
}

export interface ConnectToSurveySuccess {
  type: typeof CONNECT_TO_SOCKET_SUCCESS,
  socket: SocketIOClient.Socket
}


export interface ChartItemData {
  label: string,
  data: Array<number>,
  backgroundColor: string
}

export interface ChartData {
  labels: Array<Array<string>>,
  items: Array<ChartItemData>
}

export interface QuestionResultWithChartData extends QuestionResult{
  chartData: ChartData
}

export interface SurveyResultInitialState {
  survey: Survey,
  results: Array<QuestionResultWithChartData>,

  retrieveSurveyError: Error | null,
  retrieveSurveyResultsError: Error | null,
  socketConnectError: Error | null
}