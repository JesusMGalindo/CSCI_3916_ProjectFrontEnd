import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import store from './stores/store';                 // ✔ path matches file
import Authentication from './components/authentication';
import TaskBoard from './components/TaskBoard';
import './App.css';

/* ---------- PrivateRoute wrapper ---------- */
function PrivateRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Auth pages */}
          <Route path="/login/*"    element={<Authentication />} />
          <Route path="/register/*" element={<Authentication />} />

          {/* Protected home */}
          <Route path="/" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />

          {/* Catch‑all → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
