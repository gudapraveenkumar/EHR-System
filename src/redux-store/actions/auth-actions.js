import * as actionTypes from "./action-types";

export function loginActionHandler(userData, ownProps){
   return{
      type: actionTypes.LOGIN_REQUEST,
      data: userData,
      ownProps: ownProps
   };
};

export function signupActionHandler(userData, ownProps){
   return{
      type: actionTypes.SIGNUP_REQUEST,
      data: userData,
      ownProps: ownProps
   };
};

export function loginSuccessHandler(data){
   localStorage.setItem('token', data.token);
   localStorage.setItem('userObj', JSON.stringify(data.user))
   return{
      type: actionTypes.LOGIN_SUCCESS,
      payload: data.user
   };
};

export function logoutActionHandler(){
   localStorage.removeItem('token');
   localStorage.removeItem('userObj');
  
   return{
      type: actionTypes.LOGOUT_REQUEST,
      payload: null
   };
};

export function checkUserLogin(){
   const data = {
      user: JSON.parse(localStorage.getItem('userObj')),
      token: localStorage.getItem('token')
   }
   if(data.token && data.user){
      return{
         type: actionTypes.LOGIN_SUCCESS,
         payload: data.user
      };
   }else{
      return{
         type: actionTypes.LOGOUT_SUCCESS,
         payload: null
      };
   }
};