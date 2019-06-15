import {NEW_TASK_REQUESTED, FOUND_BAD_WORD, TASK_LIST_REQUESTED} from "./action-types";

export function addTask(data){
   return {
      type: NEW_TASK_REQUESTED, 
      taskData: data
   };
};

export function foundBadWords(data){
   return {
      type: FOUND_BAD_WORD,
      messageData: data
   };
};


export function getTasksActionHandler(){
   return{
      type: TASK_LIST_REQUESTED
   };
};

export function receiveTasksActionHandler(data){
   console.log('data in reciev =', data);
   return{
      type: "TASK_LIST_RECEIVED",
      payload: data
   };
};