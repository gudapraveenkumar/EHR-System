import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers/root-reducer";

import {forbiddenWordsMiddleware} from "../middleware/index";
import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import apiSaga from "../redux-sagas/api-saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(apiSaga);

export default store;

