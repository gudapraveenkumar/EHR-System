import * as actionTypes from "../actions/action-types";

const initialState = {
  userObj: {},
  isUserLogin: false,
  isUserSignup: false,
  isApiInProgress: false,
  isError: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isApiInProgress: true,
        isError: false
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userObj: action.payload,
        isUserLogin: true,
        isApiInProgress: false
      };

    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        userObj: {},
        isError: true,
        isApiInProgress: false
      };

    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isApiInProgress: true,
        isError: false
      };

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isApiInProgress: false,
        isUserSignup: true
      };

    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        userObj: {},
        isError: true,
        isApiInProgress: false
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        userObj: action.payload,
        isUserLogin: false
      };

    default:
      return state;
  }
}

export default authReducer;
