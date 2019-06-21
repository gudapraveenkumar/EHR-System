import * as actionTypes from "../actions/action-types";

const initialState = {
   tasks: [],
   error: '',
   apiInProgress: false,
   newTaskCreated: false
}

function taskReducer(state = initialState, action){
   
   switch(action.type){
      case actionTypes.GET_TASKS_SUCCESS:
         return{
            ...state,
            tasks: action.payload
         };
      
      case actionTypes.NEW_TASK_SUCCESS:
         return{
            ...state,
            tasks: [...state.tasks, action.payload],
            apiInProgress: false,
            newTaskCreated: true
         }
      
      case actionTypes.NEW_TASK_REQUESTED:
         return{
            ...state,
            apiInProgress: true,
            newTaskCreated: false
         }
      
      case actionTypes.FOUND_BAD_WORD:
         return{
            ...state,
            toastMessage: "Found bad words"
         }
      
      default:
         return state;
   };

};

export default taskReducer;