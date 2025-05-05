import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function CatchAll() {
  const loggedIn = useSelector((s) => s.auth.loggedIn);
  return loggedIn
    ? <Navigate to="/" replace />
    : <Navigate to="/signin" replace />;
}
