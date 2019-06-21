import {createStore, applyMiddleware, compose} from "redux";
import combineReducers from "./reducers/root-reducer";

// import {forbiddenWordsMiddleware} from "../middleware/index";
// import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root-saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers,
  storeEnhancers(applyMiddleware(initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(rootSaga);

export default store;

