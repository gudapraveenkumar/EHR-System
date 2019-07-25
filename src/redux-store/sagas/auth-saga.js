import {fork, call, take, put,cancelled, cancel, takeLatest} from "redux-saga/effects";
import auth from "../../http-services/auth-services";
import * as authActions from "../actions/action-types";
import * as actions from "../actions/auth-actions";
import { toast } from "react-toastify";


function* authorize(params){
   try{
      const response = yield call(auth.login, params);
      console.log('reponse after login =', response);
      yield put(actions.loginSuccessHandler(response.data));
   }
   catch(error){
      toast.error("Invalid Credentials!");
      yield put({type: authActions.LOGIN_ERROR, error})
   } finally{
      if(yield cancelled()){
         // we can add some clearing state varialbes logic like isloading state variable to true or false
      }
   }
};

function* registerUser(params){
   try{
      const {data} = params;
      const response = yield call(auth.signup, data)
      yield put({type: authActions.SIGNUP_SUCCESS, response}) // Dispatches the action to actions file or reducer
      toast.success("Signup Successfull !, Please Login");
   }
   catch(error){
      yield put({type: authActions.SIGNUP_ERROR, error});
      toast.error("Something Went Wrong!, Please Try Again");
   }
};

function* logout(){
   yield put({type: authActions.LOGOUT_SUCCESS, payload:null});
};


export default function* loginSaga(){
   while(true){
      const {data} = yield take(authActions.LOGIN_REQUEST)
       // Fork return a task object
      const task = yield fork(authorize, data)
      const action = yield take([authActions.LOGOUT_REQUEST, authActions.LOGIN_ERROR])

      // If the logout action is called before completeing the execution of LOGIN_REQUEST then we cancel it.
      if(action.type === authActions.LOGOUT_REQUEST){
         yield put({type: authActions.LOGOUT_SUCCESS, payload:null});
         yield cancel(task)
      }
   }
};

export function* signupSaga(){
   yield takeLatest(authActions.SIGNUP_REQUEST, registerUser);
};

export function* logoutSaga(){
   yield takeLatest(authActions.LOGOUT_REQUEST, logout);
};
