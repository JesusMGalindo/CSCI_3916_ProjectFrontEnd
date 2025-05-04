// src/actions/taskActions.js
import constants from '../constants/actionTypes';
const API = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function tasksFetched(tasks) {
  return { type: constants.FETCH_TASKS, payload: tasks };
}
function taskFetched(task) {
  return { type: constants.FETCH_TASK, payload: task };
}
function overdueFetched(tasks) {
  return { type: constants.FETCH_OVERDUE, payload: tasks };
}

function authHeaders() {
  const token = localStorage.getItem('token');
  return { Authorization: `JWT ${token}` };
}

export const fetchTasks = () => async (dispatch) => {
  const res = await fetch(`${API}/tasks`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  });
  const data = await res.json();
  dispatch(tasksFetched(data));
};

export const fetchTask = (id) => async (dispatch) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    headers: authHeaders()
  });
  const data = await res.json();
  dispatch(taskFetched(data));
};

export const addTask = (task) => async (dispatch) => {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(task)
  });
  const data = await res.json();
  dispatch({ type: constants.ADD_TASK, payload: data.task });
};

export const updateTask = (id, updates) => async (dispatch) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  dispatch({ type: constants.UPDATE_TASK, payload: data.task });
};

export const toggleComplete = (id, isCompleted = true) => async (dispatch) => {
  const res = await fetch(`${API}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
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
  dispatch(overdueFetched(data));
};
