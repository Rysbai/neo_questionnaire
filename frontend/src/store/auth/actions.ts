import {AUTH_FAIL, AUTH_SUCCESS, AuthActionTypes, GET_LOGGED_USER_SUCCESS, SET_NAME_VALUE} from "./types";
import {authUser} from "../../api/user";
import {User} from "../../api/types";
import {lsKeys} from "../constants";


export function setNameValue(nameValue: string): AuthActionTypes {
  return {
    type: SET_NAME_VALUE,
    nameValue
  }
}


export const auth = () => (dispatch: any, getState: any) => {
  const state = getState();
  const {nameValue} = state.auth;

  authUser(nameValue)
    .then((user: User) => {
      localStorage.setItem(lsKeys.loggedUser, JSON.stringify(user));

      dispatch({
        type: AUTH_SUCCESS,
        user
      })
    })
    .catch(() => {
      dispatch({
        type: AUTH_FAIL,
        error: "Уупс! Что-то пошло не так."
      })
    })
};


export const getLoggedUser = () => (dispatch: any) => {
  const loggedUser = localStorage.getItem(lsKeys.loggedUser);

  if (loggedUser){
    dispatch({
      type: GET_LOGGED_USER_SUCCESS,
      user: JSON.parse(loggedUser)
    })
  }
};

