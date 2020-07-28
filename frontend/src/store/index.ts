import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {createSurvey} from "./survey/create-edit/create/reducers";
import {editSurvey} from "./survey/create-edit/edit/reducers";
import {surveyResults} from "./survey/results/reducers";
import {reducer as notifications} from 'react-notification-system-redux';


export const rootReducer = combineReducers({
  notifications,

  auth: authReducer,
  createSurvey,
  editSurvey,
  surveyResults,
});


export type RootState = ReturnType<typeof rootReducer>
