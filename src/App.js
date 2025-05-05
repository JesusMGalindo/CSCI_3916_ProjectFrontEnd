// src/App.js
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './stores/store';
import Authentication from './components/authentication';
import TaskBoard      from './components/TaskBoard';
import TaskDetail     from './components/taskDetail';
import OverdueList    from './components/overdue';
import { useSelector } from 'react-redux';

// PrivateRoute reads auth state and redirects if no token
function PrivateRoute({ children }) {
  const token = useSelector((s) => s.auth.loggedIn);  // or s.auth.token if you store it
  return token ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Routes>
            {/* Auth pages (always public) */}
            <Route path="/signin/*"  element={<Authentication />} />
            <Route path="/signup/*"  element={<Authentication />} />

            {/* Protected flows */}
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

            {/* Any other path → sign in */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
