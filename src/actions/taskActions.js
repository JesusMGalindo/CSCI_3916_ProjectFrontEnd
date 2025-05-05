// src/actions/taskActions.js
import constants from '../constants/actionTypes';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Helper to build auth headers
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `JWT ${localStorage.getItem('token')}`
});

// ── Synchronous action to select a task ─────────────────────────
export const setTask = (task) => ({
  type: constants.SET_TASK,
  payload: task
});

// ── CRUD thunks ─────────────────────────────────────────────────
export const fetchTasks = () => async (dispatch) => {
  const res = await fetch(`${API}/tasks`, { headers: authHeaders() });
  const data = await res.json();
  dispatch({ type: constants.FETCH_TASKS, payload: data });
};

export const fetchTask = (id) => async (dispatch) => {
  const res = await fetch(`${API}/tasks/${id}`, { headers: authHeaders() });
  const data = await res.json();
  dispatch({ type: constants.FETCH_TASK, payload: data });
};

export const addTask = (task) => async (dispatch) => {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task)
  });
  const data = await res.json();
  dispatch({ type: constants.ADD_TASK, payload: data.task });
};

export const updateTask = (id, updates) => async (dispatch) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  dispatch({ type: constants.UPDATE_TASK, payload: data.task });
};

export const toggleComplete = (id, isCompleted = true) => async (dispatch) => {
  const res = await fetch(`${API}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ isCompleted })
  });
  const data = await res.json();
  dispatch({ type: constants.UPDATE_TASK, payload: data.task });
};

export const deleteTask = (id) => async (dispatch) => {
  await fetch(`${API}/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  dispatch({ type: constants.DELETE_TASK, payload: id });
};

export const fetchOverdue = () => async (dispatch) => {
  const res = await fetch(`${API}/overdue`, { headers: authHeaders() });
  const data = await res.json();
  dispatch({ type: constants.FETCH_OVERDUE, payload: data });
};
s