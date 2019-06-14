import {ADD_TASK, FOUND_BAD_WORD} from "./action-types";

export function addTask(data){
   return {
      type: ADD_TASK, 
      taskData: data
   };
};

export function foundBadWords(data){
   return {
      type: FOUND_BAD_WORD,
      messageData: data
   };
};

// Using Redux Thunk
// export function getTasks(){
//    return function(dispatch){
//       return fetch("https://jsonplaceholder.typicode.com/posts")
//       .then(response => response.json())
//       .then(json => {
//         dispatch ({ type: "DATA_LOADED", payload: json });
//       });
//    }
// };

// Using Redux Saga
export function getTasks(){
   return{
      type: "DATA_REQUESTED"
   };
};

export function loginActionHandler(userData){
   console.log('login data in action =', userData);
   return{
      type: "LOGIN_REQUEST",
      data: userData
   };
};

