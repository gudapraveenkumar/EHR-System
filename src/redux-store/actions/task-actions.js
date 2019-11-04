import * as actionTypes from "./action-types";

export function addTask(data) {
  return {
    type: actionTypes.NEW_TASK_REQUESTED,
    payload: data
  };
}

export function getTasks() {
  return {
    type: actionTypes.GET_TASKS_REQUESTED
  };
}

export function updateTask(data, taskId) {
  return {
    type: actionTypes.TASK_UPDATE_REQUESTED,
    payload: { data, taskId }
  };
}

export function deleteTask(taskId) {
  return {
    type: actionTypes.TASK_DELETE_REQUESTED,
    payload: taskId
  };
}

