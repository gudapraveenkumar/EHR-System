import * as actionTypes from "../actions/action-types";

const initialState = {
  tasks: [],
  error: "",
  isApiInProgress: false,
  isTaskCreated: false,
  isTaskDeleted: false,
  selectedTask: {}
};

function taskReducer(state = initialState, action) {
  // Check for actino
  switch (action.type) {
    case actionTypes.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        isApiInProgress: false
      };

    case actionTypes.NEW_TASK_REQUESTED:
      return {
        ...state,
        isApiInProgress: true,
        isTaskCreated: false
      };

    case actionTypes.NEW_TASK_SUCCESS:
      return {
        ...state,
        isApiInProgress: false,
        isTaskCreated: true
      };

    case actionTypes.TASK_DETAILS_REQUESTED:
      return {
        ...state,
        isApiInProgress: true,
        selectedTask: {}
      };

    case actionTypes.TASK_DETAILS_SUCCESS:
      return {
        ...state,
        isApiInProgress: false,
        selectedTask: action.taskDetails
      };

    case actionTypes.TASK_DELETE_REQUESTED:
      return {
        ...state,
        isApiInProgress: true,
        isTaskDeleted: false
      };

    case actionTypes.TASK_DELETE_SUCCESS:
      return {
        ...state,
        isApiInProgress: false,
        isTaskDeleted: true
      };

    case actionTypes.FOUND_BAD_WORD:
      return {
        ...state,
        toastMessage: "Found bad words"
      };

    default:
      return state;
  }
}

export default taskReducer;
