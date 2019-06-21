import { call, put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../actions/action-types";
import task from "../../http-services/task-services";
import {getTasksSuccess, taskCreateSuccessfully} from "../actions/task-actions";


function* getTaskList(){
   try{
      const response = yield call(task.fetchTasks);
      yield put(getTasksSuccess(response.data));
   }catch(e){
      console.log(e);
   }
};

function* createNewTask(params){
   console.log('new task data =', params);
   try{
      const data = params.payload;
      const response = yield call(task.saveNewTask, data);
      yield put(taskCreateSuccessfully(response.data)); // Dispatches the action
   } 
   catch(error){
      console.log(error);
      // yield put({type: actionTypes.SIGNUP_ERROR, error})
   } 
}

export default function* taskSaga(){
   yield takeLatest(actionTypes.GET_TASKS_REQUESTED, getTaskList);
   yield takeLatest(actionTypes.NEW_TASK_REQUESTED, createNewTask);
};
