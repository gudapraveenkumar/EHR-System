import * as actionTypes from "../actions/action-types";

const initialState = {
   tasks: [],
   error: ''
}

function taskReducer(state = initialState, action){
   
   switch(action.type){

      case actionTypes.TASKS_FETCH_SUCCESS:
         return{
            ...state,
            tasks: action.payload
         };
      
      case actionTypes.CREATE_TASK_SUCCESS:
         return{
            ...state,
            tasks: [...state.tasks, action.payload]
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