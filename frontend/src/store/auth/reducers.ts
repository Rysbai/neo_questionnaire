import createReducer from "../utils/base";

import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  GET_LOGGED_USER_SUCCESS,
  SET_NAME_VALUE,
  AuthFail,
  AuthState,
  AuthSuccess,
  GetLoggedUserSuccess,
  SetNameValueAction,
} from "./types";


const INITIAL_STATE : AuthState = {
  loggedUser: {
    id: "",
    name: "",
  },
  token: "",
  nameValue: "",
  authErrorMessage: ""
};


export const authReducer = createReducer({
  [GET_LOGGED_USER_SUCCESS]: (state: AuthState, action: GetLoggedUserSuccess) => ({
    ...state,
    loggedUser: action.loggedUser,
    token: action.token
  }),
  [SET_NAME_VALUE]: (state: AuthState, action: SetNameValueAction) => ({
    ...state,
    nameValue: action.nameValue
  }),
  [AUTH_SUCCESS]: (state: AuthState, action: AuthSuccess) => ({
    ...state,
    loggedUser: action.loggedUser,
    token: action.token
  }),
  [AUTH_FAIL]: (state: AuthState, action: AuthFail) => ({
    ...state,
    authErrorMessage: action.error
  })
}, INITIAL_STATE);
