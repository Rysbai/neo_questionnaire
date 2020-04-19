import {User} from "../../api/types";

export const SET_NAME_VALUE = "AUTH/SET_NAME_VALUE";
export const AUTH_SUCCESS = "AUTH/AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH/AUTH_FAIL";


export interface AuthState {
  loggedUser: User,
  nameValue: string,
  authErrorMessage: string
}


interface SetNameValueAction {
  type: typeof SET_NAME_VALUE,
  nameValue: string
}


interface AuthSuccess {
  type: typeof AUTH_SUCCESS,
  user: User,
}

interface AuthFail {
  type: typeof AUTH_FAIL,
  error: string
}


export type AuthActionTypes = AuthSuccess | AuthFail | SetNameValueAction
