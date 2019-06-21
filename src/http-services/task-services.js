import http from './common-services';
import { apiEndpoint } from '../config.json';

const apiUrl = `${apiEndpoint}`;

export function fetchTasks(){
   const token = localStorage.getItem('token');
   http.setJwt(token);
   return http.get(`${apiUrl}tasks/`);
};

export function saveNewTask(data){
   const token = localStorage.getItem('token');
   http.setJwt(token);
   return http.post(`${apiUrl}tasks/`, data);
}

export default{
   fetchTasks,
   saveNewTask
};
