// src/reducers/authReducer.js
import constants from '../constants/actionTypes';

const initialState = {
  token: localStorage.getItem('jwt') || null,
  username: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOGGEDIN:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username
      };

    case constants.USER_LOGOUT:
      return { token: null, username: null };

    default:
      return state;
  }
}
