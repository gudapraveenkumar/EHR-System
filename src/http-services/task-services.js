import http from './common-services';
import { apiEndpoint } from '../config.json';

const apiUrl = `${apiEndpoint}`;

function setToken(){
   const token = localStorage.getItem('token');
   http.setJwt(token);
}

export function fetchTasks(){
   setToken();
   return http.get(`${apiUrl}tasks/`);
};

export function saveNewTask(data){
   setToken();
   return http.post(`${apiUrl}tasks/`, data);
};

export function fetchTaskById(id){
   setToken();
   return http.get(`${apiUrl}tasks/${id}`);
};

export function updateTask(id, data){
   setToken();
   return http.put(`${apiUrl}tasks/${id}`, data);
};

export function deleteTask(id){
   console.log('in task delete =', id);
   setToken();
   return http.delete(`${apiUrl}tasks/${id}`);
};

export function fetchTaskPriorities(){
   return http.get(`${apiUrl}priorities/`);
};

export function fetchTaskStatuses(){
   return http.get(`${apiUrl}statuses/`);
}

export default{
   fetchTasks,
   saveNewTask,
   fetchTaskById,
   deleteTask,
   updateTask,
   fetchTaskPriorities,
   fetchTaskStatuses
};
