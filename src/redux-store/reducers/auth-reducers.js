import * as actionTypes from "../actions/action-types";

const initialState = {
  userObj: {},
  userLogin: false,
  userSignup: false,
  apiInProgress: false,
  error: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        apiInProgress: true,
        error: false
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userObj: action.payload,
        userLogin: true,
        apiInProgress: false
      };

    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        userObj: {},
        error: true,
        apiInProgress: false
      };

    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        apiInProgress: true
      };

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        apiInProgress: false,
        userSignup: true
      };

    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        userObj: {},
        error: true,
        apiInProgress: false
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        userObj: action.payload,
        userLogin: false
      };

    default:
      return state;
  }
}

export default authReducer;
