import {ThunkAction} from "redux-thunk";
import {Dispatch, GetState} from "../../base_types";
import {RootState} from "../../index";
import {Action} from "redux";
import copy from "copy-to-clipboard";
import Notifications from 'react-notification-system-redux';
import {retrieveSurvey, retrieveSurveyResults} from "../../../api/survey";
import {OptionResult, QuestionResult, Survey} from "../../../api/types";
import {
  ChartData, ChartItemData, CONNECT_TO_SOCKET_SUCCESS, QUESTION_RESULT_CHANGE,
  QuestionResultWithChartData,
  RETRIEVE_SURVEY_INFO_FAIL,
  RETRIEVE_SURVEY_INFO_SUCCESS,
  RETRIEVE_SURVEY_RESULTS_FAIL,
  RETRIEVE_SURVEY_RESULTS_SUCCESS,
  RetrieveSurveyResultsSuccess,
  SOCKET_DISCONNECTED
} from "./types";
import {connectToSocket} from "../../../api/socket";
import {CHARS} from "../../utils/common";


export const setUpPage = (surveyId: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: Dispatch): void => {

  dispatch(retrieveSurveyWithResults(surveyId));
  dispatch(setUpSocket(surveyId));
};


export const retrieveSurveyWithResults = (surveyId: string):
  ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: Dispatch): void => {

  retrieveSurvey(surveyId)
    .then((survey: Survey) => {
      dispatch({
        type: RETRIEVE_SURVEY_INFO_SUCCESS,
        survey
      })
    })
    .catch(error => {
      dispatch({
        type: RETRIEVE_SURVEY_INFO_FAIL,
        error
      })
    });

  retrieveSurveyResults(surveyId)
    .then((results) => {
      const resultsWithChartData: Array<QuestionResultWithChartData> = results.map((result): QuestionResultWithChartData => {
        return {
          ...result,
          chartData: getOptionChartData(result.optionResults)
        }
      });
      const data: RetrieveSurveyResultsSuccess = {
        type: RETRIEVE_SURVEY_RESULTS_SUCCESS,
        results: resultsWithChartData
      };
      dispatch(data);
    })
    .catch(error => {
      dispatch({
        type: RETRIEVE_SURVEY_RESULTS_FAIL,
        error
      })
    })
};


function getOptionChartData(options: Array<OptionResult>): ChartData {
  return {
      labels: options.map((option, index) => [CHARS[index]]),
      items: options.map((option, index) => getChartItemData(option, index))
  }
}


function getChartItemData(option: OptionResult, index: number): ChartItemData {
  const colors = [
    '#1abc9c',
    '#2ecc71',
    '#9b59b6',
    '#34495e',
    '#f1c40f',
    '#e74c3c',
    '#7f8c8d'
  ];
  return {
    label: option.payload,
    data: [option.answers],
    backgroundColor: colors[index]
  }
}

export const setUpSocket = (surveyId: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: Dispatch): void => {
  const socket = connectToSocket();


  socket.on('connect', function () {

    socket.send('question_update', 'bla bla bla');
    dispatch({
      type: CONNECT_TO_SOCKET_SUCCESS
    })
  });

  socket.on('my response', function (args: any) {
    console.log(args)
  });
  socket.on('disconnect', function () {
    dispatch({
      type: SOCKET_DISCONNECTED
    })
  });

  socket.on('question-result-change', function (questionResult: QuestionResult) {
    const result =  {
      ...questionResult,
      chartData: getOptionChartData(questionResult.optionResults)
    };
    dispatch({
      type: QUESTION_RESULT_CHANGE,
      result
    })
  })
};

export const copyCode = ():ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: Dispatch, getState: GetState): void => {
  const {surveyResults} = getState();

  copy(surveyResults.survey.code);
  dispatch(Notifications.success({
    title: 'Survey code copied!',
    position: 'tr',
    autoDismiss: 1,
  }));
};
