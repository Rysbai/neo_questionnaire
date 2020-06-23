import {QuestionResult, Survey} from "../../../api/types";

export const RETRIEVE_SURVEY_INFO_SUCCESS = "SURVEY_RESULTS/RETRIEVE_SURVEY_INFO";
export const CONNECT_TO_SOCKET_SUCCESS = "SURVEY_RESULTS/CONNECT_TO_SOCKET_SUCCESS";
export const RETRIEVE_SURVEY_INFO_FAIL = "SURVEY_RESULTS/RETRIEVE_SURVEY_INFO_FAIL";
export const CONNECT_TO_SOCKET_FAIL = "SURVEY_RESULTS/CONNECT_TO_SOCKET_FAIL";
export const RETRIEVE_SURVEY_RESULTS_SUCCESS = "SURVEY_RESULT/RETRIEVE_SURVEY_RESULTS_SUCCESS";
export const RETRIEVE_SURVEY_RESULTS_FAIL = "SURVEY_RESULT/RETRIEVE_SURVEY_RESULTS_FAIL";
export const SET_CHARTS_DATA = "SURVEY_RESULT/SET_CHARTS_DATA";


export interface RetrieveSurveyInfoSuccess {
  type: typeof RETRIEVE_SURVEY_INFO_SUCCESS,
  survey: Survey
}


export interface RetrieveSurveyResultsSuccess {
  type: typeof RETRIEVE_SURVEY_RESULTS_SUCCESS,
  results: Array<QuestionResultWithChartData>
}

export interface SetChartsData {
  type: typeof SET_CHARTS_DATA,
  charts: Array<ChartData>
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