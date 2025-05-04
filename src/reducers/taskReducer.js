// src/reducers/taskReducer.js
import constants from '../constants/actionTypes';

const initialState = {
  list: [],           // all tasks
  selected: null      // task currently opened in a modal, etc.
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_TASKS:
      return { ...state, list: action.payload };

    case constants.SET_TASK:
    case constants.FETCH_TASK:
      return { ...state, selected: action.payload };

    case constants.ADD_TASK:
      return { ...state, list: [...state.list, action.payload] };

    case constants.UPDATE_TASK:
      return {
        ...state,
        list: state.list.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
        selected:
          state.selected && state.selected._id === action.payload._id
            ? action.payload
            : state.selected
      };

    case constants.DELETE_TASK:
      return {
        ...state,
        list: state.list.filter((t) => t._id !== action.payload),
        selected:
          state.selected && state.selected._id === action.payload
            ? null
            : state.selected
      };

    default:
      return state;
  }
}
