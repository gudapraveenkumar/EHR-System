import * as actionTypes from "../actions/action-types";

const initialState = {
   userObj: {},
   userLogin: false
};

function authReducer(state = initialState, action){
   switch(action.type){
      case actionTypes.LOGIN_SUCCESS:
         return{
            ...state,
            userObj: action.payload,
            userLogin: true
         };
      
      case actionTypes.LOGOUT_SUCCESS:
         return{
            ...state,
            userObj: action.payload,
            userLogin: false
         };
      
      default:
         return state;
   }
};

export default authReducer;