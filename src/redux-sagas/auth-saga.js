import {fork, call, take, put,cancelled, cancel, takeLatest} from "redux-saga/effects";
import auth from "../http-services/auth-services";
import * as authActions from "../redux-store/actions/action-types";
import * as actions from "../redux-store/actions/auth-actions";


function* authorize(params, ownProps){
   try{
      const response = yield call(auth.login, params)
      yield put(actions.loginSuccessHandler(response.data))
      ownProps.history.push('/taskList');
      return response;
   } 
   catch(error){
      yield put({type: authActions.LOGIN_ERROR, error})
   } finally{
      if(yield cancelled()){
         // we can add some clearing state varialbes logic like isloading state variable to true or false
      }
   }
};

export default function* authSaga(){
   while(true){
      const {data, ownProps} = yield take(authActions.LOGIN_REQUEST)
       // Fork return a task object 
      const task = yield fork(authorize, data, ownProps) 
      const action = yield take([authActions.LOGOUT_REQUEST, authActions.LOGIN_ERROR])
      
      // If the logout action is called before completeing the execution of LOGIN_REQUEST then we cancel it.
      if(action.type === authActions.LOGOUT_REQUEST){
         yield put({type: authActions.LOGOUT_SUCCESS, payload:null});
         yield cancel(task)
      }
   }
};

function* registerUser(params){
   try{
      const {data, ownProps} = params;
      const response = yield call(auth.signup, data)
      yield put({type: authActions.SIGNUP_SUCCESS, response}) // Dispatches the action
      ownProps.history.push('/taskList');
      return response;
   } 
   catch(error){
      yield put({type: authActions.SIGNUP_ERROR, error})
   } 
}

export function* signupSaga(){
   yield takeLatest(authActions.SIGNUP_REQUEST, registerUser);
};


