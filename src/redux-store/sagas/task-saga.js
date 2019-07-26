import { call, put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../actions/action-types";
import task from "../../http-services/task-services";
import {getTasksSuccess, taskCreateSuccessfully} from "../actions/task-actions";
import { toast } from "react-toastify";

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
      toast.success("Task created Successfully! ")
   }
   catch(error){
      toast.error("Something Went Wrong, Please Try Again ")
      console.log(error);
      // yield put({type: actionTypes.SIGNUP_ERROR, error})
   }
};

function* getTaskDetails(params){
   console.log('in task details =',params);
   try{
      const data = params.payload;
      const response = yield call(task.fetchTaskById, data);
      const taskDetails = response.data.task;
      console.log('response after task details =', taskDetails);
      yield put({type: actionTypes.TASK_DETAILS_SUCCESS, taskDetails});
   }catch(error){
      console.log(error);
   }
}

export default function* taskSaga(){
   yield takeLatest(actionTypes.GET_TASKS_REQUESTED, getTaskList);
   yield takeLatest(actionTypes.NEW_TASK_REQUESTED, createNewTask);
   yield takeLatest(actionTypes.TASK_DETAILS_REQUESTED, getTaskDetails)
};
