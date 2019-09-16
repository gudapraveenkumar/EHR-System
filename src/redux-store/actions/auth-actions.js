import * as actionTypes from "./action-types";
import { removeAppData, storeAppData } from "../../helper/manage-storage";

export function loginActionHandler(userData) {
  return {
    type: actionTypes.LOGIN_REQUEST,
    payload: userData
  };
}

export function signupActionHandler(userData) {
  return {
    type: actionTypes.SIGNUP_REQUEST,
    payload: userData
  };
}

export function loginSuccessHandler(data) {
  storeAppData(data);
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data.user
  };
}

export function logoutActionHandler() {
  removeAppData();
  return {
    type: actionTypes.LOGOUT_REQUEST,
    payload: null
  };
}

export function checkUserLogin() {
  const data = {
    user: JSON.parse(localStorage.getItem("userObj")),
    token: localStorage.getItem("token")
  };
  if (data.token && data.user) {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      payload: data.user
    };
  } else {
    return {
      type: actionTypes.LOGOUT_SUCCESS,
      payload: null
    };
  }
}
