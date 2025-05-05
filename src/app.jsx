import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Board from './pages/Board';

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={user ? <Board /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
