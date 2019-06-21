import {fork, all} from "redux-saga/effects";

// import taskSaga from "./task-saga";
// import authSaga from "./auth-saga";

// export default function* rootSaga(){
//    yield all([
//       fork(taskSaga),
//       fork(authSaga)
//    ]);
// };

import * as taskSagas from "./task-saga";
import * as authSagas from "./auth-saga";

export default function* rootSaga(){
   yield all([
      ...Object.values(taskSagas),
      ...Object.values(authSagas)
   ].map(fork));
}