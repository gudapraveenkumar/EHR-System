import http from "./common-services";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}`;

export function login(data) {
  return http.post(`${apiUrl}login`, data);
}

export function signup(data) {
  return http.post(`${apiUrl}register`, data);
}

export default {
  login,
  signup
};
