// src/actions/authActions.js
import axios from 'axios';
import constants from '../constants/actionTypes';

// API base comes from .env  (fallback to localhost)
const API = process.env.REACT_APP_API_URL;

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/signin`, { username, password });
    const token = res.data.token.split(' ')[1]; // strip "JWT "
    localStorage.setItem('jwt', token);

    dispatch({
      type: constants.USER_LOGGEDIN,
      payload: { token, username }
    });
  } catch (err) {
    console.error(err);
    // TODO: dispatch failure
  }
};

export const register = (user) => async (dispatch) => {
  try {
    await axios.post(`${API}/signup`, user);
    // auto‑login
    dispatch(login(user.username, user.password));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({ type: constants.USER_LOGOUT });
};
