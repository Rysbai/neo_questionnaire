import {RootState} from "../../../index";
import {createSurvey as gqlCreateSurvey} from "../../../../api/survey"
import {CREATE_SURVEY_FAIL, RESET_STATE} from "./types";
import {appHistory} from "../../../../index";


export const createSurvey = () => (dispatch: any, getState: any) : void => {
  const state : RootState = getState();
  const {title, description, code, isAnonymous, isActual, isOpen} = state.createSurvey;

  gqlCreateSurvey({id: undefined, title, description, code, isAnonymous, isActual, isOpen, questions: []})
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
