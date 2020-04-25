import createReducer from "../utils/base";

import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AuthState,
  GET_LOGGED_USER_SUCCESS,
  SET_NAME_VALUE,
} from "./types";


const INITIAL_STATE : AuthState = {
  loggedUser: {
    id: "",
    name: ""
  },
  nameValue: "",
  authErrorMessage: ""
};


export const authReducer = createReducer({
  [GET_LOGGED_USER_SUCCESS]: (state: any, action: any) => ({
    ...state,
    loggedUser: action.user
  }),
  [SET_NAME_VALUE]: (state: any, action: any) => ({
    ...state,
    nameValue: action.nameValue
  }),
  [AUTH_SUCCESS]: (state: any, action: any) => ({
    ...state,
    loggedUser: action.user
  }),
  [AUTH_FAIL]: (state: any, action: any) => ({
    ...state,
    authErrorMessage: action.error
  })
}, INITIAL_STATE);
