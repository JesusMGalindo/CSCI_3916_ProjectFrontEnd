// src/actions/authActions.js
import axios from 'axios';
import constants from '../constants/actionTypes';

const API = process.env.REACT_APP_API_URL;

function userLoggedIn(username, token) {
  return {
    type: constants.USER_LOGGEDIN,
    payload: { username, token },
  };
}

export function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  return { type: constants.USER_LOGOUT };
}

export function login(username, password) {
  return async (dispatch) => {
    const res = await axios.post(`${API}/signin`, { username, password });
    const token = res.data.token.split(' ')[1];
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    dispatch(userLoggedIn(username, token));
  };
}

export function register({ name, username, email, password }) {
  return async (dispatch) => {
    await axios.post(`${API}/signup`, { name, username, email, password });
    return dispatch(login(username, password));
  };
}
