import React from 'react';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import store from './stores/store';
import Authentication from './components/authentication';
import TaskBoard      from './components/TaskBoard';
import TaskDetail     from './components/taskDetail';
import OverdueList    from './components/overdue';

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
            {/* Public auth pages */}
            <Route path="/signin/*" element={<Authentication />} />
            <Route path="/signup/*" element={<Authentication />} />

            {/* Protected routes */}
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

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to={useSelector((s) => s.auth.loggedIn) ? "/" : "/signin"} replace />}
            />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
