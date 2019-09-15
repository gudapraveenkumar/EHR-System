import { ADD_TASK } from "../redux-store/actions/action-types";

const forbiddenWords = ["Spam", "Money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_TASK) {
        const foundWord = forbiddenWords.filter(word =>
          action.taskData.title.includes(word)
        );

        if (foundWord.length) {
          return dispatch({
            type: "FOUND_BAD_WORD",
            message: "Used inappropriate words"
          });
        }
      }
      return next(action);
    };
  };
}
