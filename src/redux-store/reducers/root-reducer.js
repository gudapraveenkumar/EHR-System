import {combineReducers} from "redux";
import AuthReducer from "./auth-reducers";

export default combineReducers({
   auth: AuthReducer
})