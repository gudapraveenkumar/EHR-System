import { combineReducers } from "redux";
import AuthReducer from "./auth-reducers";
import TaskReducer from "./task-reducers";

export default combineReducers({
  auth: AuthReducer,
  task: TaskReducer
});
