// src/App.js
import React from 'react';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import store from './stores/store';
import Authentication from './components/authentication';
import TaskBoard      from './components/TaskBoard';
import TaskDetail     from './components/taskDetail';
import OverdueList    from './components/overdue';

/**
 * PrivateRoute guard:
 * - Reads loggedIn from Redux
 * - If true, renders children
 * - If false, redirects to /signin
 */
function PrivateRoute({ children }) {
  const loggedIn = useSelector((s) => s.auth.loggedIn);
  return loggedIn
    ? children
    : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Routes>
            {/* PUBLIC: Sign-in / Sign-up pages */}
            <Route path="/signin/*" element={<Authentication />} />
            <Route path="/signup/*" element={<Authentication />} />

            {/* PROTECTED: Board, Detail, Overdue */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <TaskBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <PrivateRoute>
                  <TaskDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/overdue"
              element={
                <PrivateRoute>
                  <OverdueList />
                </PrivateRoute>
              }
            />

            {/* CATCH-ALL redirects unauth to Signin, auth’d to Board */}
            <Route
              path="*"
              element={
                useSelector((s) => s.auth.loggedIn)
                  ? <Navigate to="/" replace />
                  : <Navigate to="/signin" replace />
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
