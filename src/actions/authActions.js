import axios from 'axios';
import constants from '../constants/actionTypes';

// Base API URL with fallback
const API = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// If there's a token from a previous session, set it as default header
const existingToken = localStorage.getItem('token');
if (existingToken) {
  axios.defaults.headers.common.Authorization = `JWT ${existingToken}`;
}

// Action creator
function userLoggedIn(username, token) {
  return {
    type: constants.USER_LOGGEDIN,
    payload: { username, token },
  };
}

export function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  return { type: constants.USER_LOGOUT };
}

export function loginUser(username, password) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API}/signin`, { username, password });
      const token = res.data.token.split(' ')[1];
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      dispatch(userLoggedIn(username, token));
    } catch (err) {
      console.error('Login error:', err);
    }
  };
}

export function registerUser({ name, username, email, password }) {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/signup`, { name, username, email, password });
      return dispatch(loginUser(username, password));
    } catch (err) {
      console.error('Signup error:', err);
    }
  };
}
