import { call, put, takeLatest, select, takeEvery, take} from "redux-saga/effects";


import {TASK_LIST_REQUESTED} from "../redux-store/actions/action-types";
import task from "../http-services/task-services";
import {receiveTasksActionHandler} from "../redux-store/actions/task-actions";


function* getTaskList(){
   try{
      const response = yield call(task.fetchTasks);
      yield put(receiveTasksActionHandler(response.data));
   }catch(e){
      console.log(e);
   }
};

export default function* taskSaga(){
   yield takeLatest(TASK_LIST_REQUESTED, getTaskList);
};

export function* watchAndLogtakeEvery(){
   yield takeEvery('*', function* logger(action) {
      const state = yield select()
  
      console.log('action takevery', action);
      console.log('state after takevery', state);
    })
};

export function* watchAndLogTake() {
   while (true) {
     const action = yield take('*')
     const state = yield select()
 
     console.log('action take', action)
     console.log('state after take', state)
   }
 }