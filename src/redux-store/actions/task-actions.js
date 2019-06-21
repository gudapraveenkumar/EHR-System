import * as actionTypes from "./action-types";

export function addTask(data){
   return {
      type: actionTypes.NEW_TASK_REQUESTED, 
      payload: data
   };
};

export function taskCreateSuccessfully(data){
   return {
      type: actionTypes.NEW_TASK_SUCCESS,
      payload: data.task
   }
}

export function foundBadWords(data){
   return {
      type: actionTypes.FOUND_BAD_WORD,
      messageData: data
   };
};


export function getTasks(){
   return{
      type: actionTypes.GET_TASKS_REQUESTED
   };
};

export function getTasksSuccess(data){
   console.log('tasks in actions =',data);
   return{
      type: actionTypes.GET_TASKS_SUCCESS,
      payload: data.tasks
   };
};