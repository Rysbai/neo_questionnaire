import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {createSurvey} from "./survey/create-edit/create/reducers";


export const rootReducer = combineReducers({
  auth: authReducer,
  createSurvey
});


export type RootState = ReturnType<typeof rootReducer>
