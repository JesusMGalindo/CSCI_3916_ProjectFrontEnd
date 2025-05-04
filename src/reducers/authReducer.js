// src/reducers/authReducer.js
import constants from '../constants/actionTypes';

const initialState = {
  loggedIn: Boolean(localStorage.getItem('token')),
  username: localStorage.getItem('username') || ''
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username
      };
    case constants.USER_LOGOUT:
      return { ...state, loggedIn: false, username: '' };
    default:
      return state;
  }
}
