import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import store from './store';
import Authentication from './components/authentication';
import TaskBoard from './components/TaskBoard';
import './App.css';

function App() {
  // We could read auth state from Redux here to guard routes,
  // but simplest is to let Authentication handle its own routes
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Auth pages */}
          <Route path="/login/*"    element={<Authentication />} />
          <Route path="/register/*" element={<Authentication />} />

          {/* Protected home (simple check on token) */}
          <Route path="/" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />

          {/* catch‑all -> login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

/* ---------- PrivateRoute wrapper ---------- */
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default App;
