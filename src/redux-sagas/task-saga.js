import { call, put, takeLatest} from "redux-saga/effects";


import {TASK_LIST_REQUESTED} from "../redux-store/actions/action-types";
import task from "../http-services/task-services";
import {receiveTasksActionHandler} from "../redux-store/actions/task-actions";


function* getTaskList(){
   try{
      const response = yield call(task.fetchTasks);
      console.log('data tasks =', response.data);
      yield put(receiveTasksActionHandler(response.data));
   }catch(e){
      console.log(e);
   }
};

export default function* taskSaga(){
   yield takeLatest(TASK_LIST_REQUESTED, getTaskList);
};