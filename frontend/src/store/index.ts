import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {createSurvey} from "./survey/create-edit/create/reducers";
import {editSurvey} from "./survey/create-edit/edit/reducers";


export const rootReducer = combineReducers({
  auth: authReducer,
  createSurvey,
  editSurvey
});


export type RootState = ReturnType<typeof rootReducer>
