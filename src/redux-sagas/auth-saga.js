import {fork, call, take, put,cancelled, cancel} from "redux-saga/effects";
import auth from "../http-services/auth-services";
import {LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT_REQUEST} from "../redux-store/actions/action-types";


function* authorize(params, ownProps){
   try{
      const response = yield call(auth.login, params)
      yield put({type: LOGIN_SUCCESS, response})
      // window.location = "/taskList"
      ownProps.history.push('/taskList');
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
   // while condition helps to complete the actions in sequence. First login request occurs and then logout.
   // We cannot call logout before login. And also we cannot call login and logout twice at a time becuase 
   // the actions should go in sequence.
   while(true){
      
      const {data, ownProps} = yield take(LOGIN_REQUEST)
     
      const task = yield fork(authorize, data, ownProps)  // Fork return a task object 
      
      const action = yield take([LOGOUT_REQUEST, LOGIN_ERROR])
      // If the logout action is called before completeing the execution of LOGIN_REQUEST then we cancel it.
      if(action.type === LOGOUT_REQUEST){
         yield cancel(task)
      }
      
   }
};