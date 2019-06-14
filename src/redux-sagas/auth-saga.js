import {fork, call, take, put} from "redux-saga/effects";
import auth from "../http-services/auth-services";


function* authorize(params){
   try{
      const response = yield call(auth.login(params))
      yield put({type: 'LOGIN_SUCCESS', response})
      localStorage.setItem('token', response)
   } 
   catch(error){
      yield put({type: "LOGIN_ERROR", error})
   }
};

function* authFlow(){
   while(true){
      yield take("LOGIN_REQUEST")

      // Fork return a task object
      const task = yield fork(authorize)
      
      const action = yield take(['LOGOUT', 'LOGINERROR'])
      if(action.type === "LOGOUT"){
         yield cancel(task)
      }

      localStorage.removeItem('token');
   }
}