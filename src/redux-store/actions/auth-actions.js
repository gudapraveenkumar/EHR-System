import {LOGIN_REQUEST, SIGNUP_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST} from "./action-types";

export function loginActionHandler(userData){
   console.log('login data in action =', userData);
   return{
      type: LOGIN_REQUEST,
      data: userData
   };
};

export function signupActionHandler(userData){
   console.log('signup data in action =', userData);
   return{
      type: SIGNUP_REQUEST,
      data: userData
   };
};


export function loginSuccessHandler(userData){
   console.log('login successfull', userData);
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