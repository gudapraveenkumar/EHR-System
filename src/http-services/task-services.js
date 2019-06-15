import http from './common-services';
// import { apiEndpoint } from '../config.json';

// const apiUrl = `${apiEndpoint}`;

export function fetchTasks(){
   // const apiData = {
   //    "email":data.username,
   //    "password":data.password
   // }
   return http.get(`https://jsonplaceholder.typicode.com/posts`);
};

export default{
   fetchTasks
}
