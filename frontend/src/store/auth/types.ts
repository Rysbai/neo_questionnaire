import {User} from "../../api/types";

export const SET_NAME_VALUE = "AUTH/SET_NAME_VALUE";
export const AUTH_SUCCESS = "AUTH/AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH/AUTH_FAIL";
export const GET_LOGGED_USER_SUCCESS = "AUTH/GET_LOGGED_USER_SUCCESS";


export interface AuthState {
  loggedUser: User,
  token: string,
  nameValue: string,
  authErrorMessage: string
}


export interface GetLoggedUserSuccess {
  type: typeof GET_LOGGED_USER_SUCCESS,
  loggedUser: User,
  token: string
}


export interface SetNameValueAction {
  type: typeof SET_NAME_VALUE,
  nameValue: string
}


export interface AuthSuccess {
  type: typeof AUTH_SUCCESS,
  loggedUser: User,
  token: string
}

export interface AuthFail {
  type: typeof AUTH_FAIL,
  error: string
}


export type AuthActionTypes = AuthSuccess | AuthFail | SetNameValueAction | GetLoggedUserSuccess
