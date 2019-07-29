import { call, put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../actions/action-types";
import task from "../../http-services/task-services";
import {getTasksSuccess, taskCreateSuccessfully} from "../actions/task-actions";
import { toast } from "react-toastify";

function* getTaskList(){
   try{
      const response = yield call(task.fetchTasks);
      const payload = response.data.tasks;
      yield put({type:actionTypes.GET_TASKS_SUCCESS, payload});
   }catch(e){
      console.log(e);
   }
};

function* createNewTask(params){
   try{
      const response = yield call(task.saveNewTask, params.payload);
      const taskDetails = response.data.task;
      yield put({type:actionTypes.NEW_TASK_SUCCESS, taskDetails}); // Dispatches the action
      yield call(getTaskList);
      toast.success("Task created Successfully! ")
   }
   catch(error){
      toast.error("Something Went Wrong, Please Try Again ")
      console.log(error);
      // yield put({type: actionTypes.SIGNUP_ERROR, error})
   }
};

function* updateTask(params){

   try{
      const response = yield call(task.updateTask, params.payload.taskId, params.payload.data);
      const taskDetails = response.data.task;
      yield put({type: actionTypes.TASK_UPDATE_SUCCESS, taskDetails}); // Dispatches the action
      yield call(getTaskList);
      toast.success("Task Updated Successfully! ");
   }catch(error){
      toast.error("Something went wrong while updating, Please Try Again");
   }
};

function* deleteTask(params){
   console.log('params in delete =', params);
   try{
      const response = yield call(task.deleteTask, params.payload);
      yield put({type: actionTypes.TASK_DELETE_SUCCESS, response});
      yield call(getTaskList);
      toast.success("Task Deleted Successfully! ");
   }catch(error){
      toast.error("Task Delete Failed, Please Try Again");
   }
};

export default function* taskSaga(){
   yield takeLatest(actionTypes.GET_TASKS_REQUESTED, getTaskList);
   yield takeLatest(actionTypes.NEW_TASK_REQUESTED, createNewTask);
   yield takeLatest(actionTypes.TASK_UPDATE_REQUESTED, updateTask);
   yield takeLatest(actionTypes.TASK_DELETE_REQUESTED, deleteTask);
};
