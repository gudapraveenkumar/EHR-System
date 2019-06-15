import {LOGIN_REQUEST, SIGNUP_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST} from "./action-types";

export function loginActionHandler(userData, ownProps){
   return{
      type: LOGIN_REQUEST,
      data: userData,
      ownProps: ownProps
   };
};

export function signupActionHandler(userData){
   return{
      type: SIGNUP_REQUEST,
      data: userData
   };
};


export function loginSuccessHandler(userData){
   return{
      type: LOGIN_SUCCESS,
      data: userData
   };
};

export function logoutActionHandler(){
   return{
      type: LOGOUT_REQUEST
   };
};