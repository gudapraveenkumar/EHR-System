import http from './common-services';
import { apiEndpoint } from '../config.json';

const apiUrl = `${apiEndpoint}`;

export function login(data){
   // const apiData = {
   //    "email":data.username,
   //    "password":data.password
   // }
   return http.post(`${apiUrl}login`, data);
};

export default{
   login
}
