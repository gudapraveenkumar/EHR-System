import {fork, call, take, put,cancelled, cancel} from "redux-saga/effects";
import auth from "../http-services/auth-services";
import {LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT_REQUEST} from "../redux-store/actions/action-types";
import {push} from "react-router-dom";


function* authorize(params){
   try{
      const response = yield call(auth.login, params)
      yield put({type: LOGIN_SUCCESS, response})
      window.location = "/taskList"
      return response
   } 
   catch(error){
      yield put({type: LOGIN_ERROR, error})
   } finally{
      if(yield cancelled()){
         // we can add some clearing state varialbes logic like isloading state variable to true or false
      }
   }
};

export default function* authSaga(){
   while(true){
      
      const {data} = yield take(LOGIN_REQUEST)
     
      const task = yield fork(authorize, data)  // Fork return a task object 
      
      const action = yield take([LOGOUT_REQUEST, LOGIN_ERROR])
      if(action.type === LOGOUT_REQUEST){
         yield cancel(task)
      }
      localStorage.removeItem('token');
   }
};