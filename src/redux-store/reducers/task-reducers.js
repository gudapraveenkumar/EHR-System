import * as actionTypes from "../actions/action-types";

const initialState = {
   tasks: [],
   error: '',
   apiInProgress: false,
   newTaskCreated: false,
   taskUpdated: false,
   taskDeleted: false,
   selectedTask: {}
}

function taskReducer(state = initialState, action){
   // Check for actino
   // console.log('action =', action);
   switch(action.type){
      case actionTypes.GET_TASKS_SUCCESS:
         return{
            ...state,
            tasks: action.payload
         };
      
      case actionTypes.NEW_TASK_REQUESTED:
         return{
            ...state,
            apiInProgress: true,
            newTaskCreated: false
         }
      
      case actionTypes.NEW_TASK_SUCCESS:
         return{
            ...state,
            tasks: [...state.tasks, action.payload],
            apiInProgress: false,
            newTaskCreated: true
         }
      
      case actionTypes.TASK_DETAILS_REQUESTED:
         return{
            ...state,
            apiInProgress: true,
            selectedTask: {}
         }
      
      case actionTypes.TASK_DETAILS_SUCCESS:
         console.log('assinging data', action.taskDetails);
         return{
            ...state,
            apiInProgress: false,
            selectedTask : action.taskDetails
         }
      
      case actionTypes.TASK_DELETE_REQUESTED:
         return{
            ...state,
            apiInProgress: true,
            taskDeleted: false
         }

      case actionTypes.TASK_DELETE_SUCCESS:
         return{
            ...state,
            apiInProgress: false,
            taskDeleted: true
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