import {NEW_TASK_REQUESTED, FOUND_BAD_WORD, DATA_LOADED} from "../actions/action-types";

const initialState = {
   userLogin: false,
   tasks: [],
   userObj: {},
   toastMessage: ""
};

function rootReducer(state = initialState, action){
   console.log("action =", action);

   if(action.type === NEW_TASK_REQUESTED){
      return {
         ...state,
         tasks: [...state.tasks, action.payload],
         toastMessage: "Task Added Successfully"
      }
   };

   if(action.type === FOUND_BAD_WORD){
      return{
         ...state,
         toastMessage: "Found bad words"
      }
   };

   if(action.type === 'LOGIN_SUCCESS'){
      console.log('action after login reducer =', action)
      return{
         ...state,
         userObj : action
      }
   };
   
   if(action.type === "TASK_LIST_RECEIVED"){
      return {
         ...state,
         tasks: action.payload,
         toastMessage: "Tasks fetched Successfully"
      }
   }

   if(action.type === DATA_LOADED){
      return {
         ...state,
         tasks: action.payload,
         toastMessage: "Tasks fetched Successfully"
      }
   }
   return state;
};

export default rootReducer;
