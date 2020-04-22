import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AuthActionTypes,
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


export function authReducer(
  state = INITIAL_STATE,
  action: AuthActionTypes
) {
  switch (action.type) {
    case GET_LOGGED_USER_SUCCESS:
      return {
        ...state,
        loggedUser: action.user
      };

    case SET_NAME_VALUE:
      return {
        ...state,
        nameValue: action.nameValue
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        loggedUser: action.user
      };

    case AUTH_FAIL:
      return {
        ...state,
        authErrorMessage: action.error
      };

    default:
      return INITIAL_STATE
  }
}