// src/actions/authActions.js
import axios from 'axios';
import constants from '../constants/actionTypes';

// Fallback to localhost if the env var is missing
const API = process.env.REACT_APP_API_URL;

function userLoggedIn(username, token) {
  return {
    type: constants.USER_LOGGEDIN,
    payload: { username, token },
  };
}

export function logout() {
  // Remove from storage
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  // Clear the default Axios header
  delete axios.defaults.headers.common.Authorization;
  return { type: constants.USER_LOGOUT };
}

export function login(username, password) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API}/signin`, { username, password });
      const token = res.data.token.split(' ')[1];

      // Persist
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);

      // Install default header for all future requests
      axios.defaults.headers.common.Authorization = `JWT ${token}`;

      dispatch(userLoggedIn(username, token));
    } catch (err) {
      console.error('Login error:', err);
      // TODO: dispatch a LOGIN_ERROR action to show UI feedback
    }
  };
}

export function register({ name, username, email, password }) {
  return async (dispatch) => {
    try {
      await axios.post(`${API}/signup`, { name, username, email, password });
      // On success, immediately log in
      return dispatch(login(username, password));
    } catch (err) {
      console.error('Signup error:', err);
      // TODO: dispatch a REGISTER_ERROR action if needed
    }
  };
}
