import {RootState} from "../../../index";
import {createSurvey as gqlCreateSurvey} from "../../../../api/survey"
import {CREATE_SURVEY_FAIL, RESET_STATE} from "./types";
import {appHistory} from "../../../../index";


export const createSurvey = () => (dispatch: any, getState: any) : void => {
  const state : RootState = getState();
  const {title, description, isAnonymous, isActual} = state.createSurvey;
  const {token} = state.auth;

  gqlCreateSurvey({id: null, title, description, isAnonymous, isActual, questions: []}, token)
    .then((survey) => {
      dispatch({
        type: RESET_STATE
      });

      appHistory.push(`/my-surveys/${survey.id}/edit`)
    })
    .catch(() => {
      dispatch({
        type: CREATE_SURVEY_FAIL,
        error: 'Уупс! Что пошло не так!'
      })
    })
};
