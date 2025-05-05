const API = import.meta.env.VITE_API || 'http://localhost:8080/api';

let token = localStorage.getItem('jwt') || null;
export const setToken = t => { token = t; localStorage.setItem('jwt', t); };

export const apiFetch = (path, opts = {}) => {
  const headers = { 'Content-Type': 'application/json', ...opts.headers };
  if (token) headers.Authorization = `JWT ${token}`;
  return fetch(`${API}${path}`, { ...opts, headers })
    .then(r => r.ok ? r.json() : Promise.reject(r));
};