// src/actions/taskActions.js
import axios from 'axios';
import constants from '../constants/actionTypes';

const API = process.env.REACT_APP_API_URL;

// helper to attach JWT header
function authHeaders() {
  const token = localStorage.getItem('jwt');
  return { Authorization: `JWT ${token}` };
}

// ── CRUD actions ──────────────────────────────────────────────
export const fetchTasks = () => async (dispatch) => {
  const res = await axios.get(`${API}/tasks`, { headers: authHeaders() });
  dispatch({ type: constants.FETCH_TASKS, payload: res.data });
};

export const addTask = (task) => async (dispatch) => {
  const res = await axios.post(`${API}/tasks`, task, { headers: authHeaders() });
  dispatch({ type: constants.ADD_TASK, payload: res.data.task });
};

export const updateTask = (id, updates) => async (dispatch) => {
  const res = await axios.put(`${API}/tasks/${id}`, updates, { headers: authHeaders() });
  dispatch({ type: constants.UPDATE_TASK, payload: res.data.task });
};

export const toggleComplete = (id, isCompleted = true) => async (dispatch) => {
  const res = await axios.patch(
    `${API}/tasks/${id}/complete`,
    { isCompleted },
    { headers: authHeaders() }
  );
  dispatch({ type: constants.UPDATE_TASK, payload: res.data.task });
};

export const deleteTask = (id) => async (dispatch) => {
  await axios.delete(`${API}/tasks/${id}`, { headers: authHeaders() });
  dispatch({ type: constants.DELETE_TASK, payload: id });
};
