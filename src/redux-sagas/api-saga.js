import { takeEvery, call, put } from "redux-saga/effects";
import auth from "../http-services/auth-services";

// Watcher is basically a generator function watching every action we are interested in
export default function* rootSaga() {
  // yield takeEvery("DATA_REQUESTED", workerSaga);
  yield takeEvery("LOGIN_REQUEST", workerSaga);
};

function* workerSaga(params) {
  console.log('params in worker saga =', params);
  try {
    const response = yield call(auth.login(params.data));
    console.log('response after login =', response);
    yield put({ type: "DATA_LOADED", response });
  } catch (error) {
    yield put({ type: "API_ERRORED", payload: error });
  }
};


