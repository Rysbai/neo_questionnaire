import {AUTH_SUCCESS, AuthActionTypes, SET_NAME_VALUE} from "./types";
import {authUser} from "../../api/user";
import {User} from "../../api/types";


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
      localStorage.setItem('loggedUser', JSON.stringify(user));

      dispatch({
        type: AUTH_SUCCESS,
        user
      })
    })
};

