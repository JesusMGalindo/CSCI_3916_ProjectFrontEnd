// src/components/Authentication.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginUser, registerUser, logout } from '../actions/authActions';
import Login from './login';
import Register from './register';

export default function Authentication() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((s) => s.auth.loggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  const current = location.pathname.includes('signup') ? 'signup' : 'signin';

  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  const handleSelect = (key) => {
    navigate(`/${key}`, { replace: true });
  };

  if (loggedIn) return null;

  return (
    <div className="auth-container d-flex flex-column align-items-center justify-content-center vh-100">
      <Nav
        variant="tabs"
        activeKey={current}
        onSelect={handleSelect}
        className="mb-4"
      >
        <Nav.Item>
          <Nav.Link eventKey="signin">Sign In</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signup">Sign Up</Nav.Link>
        </Nav.Item>
      </Nav>

      {current === 'signup' ? <Register /> : <Login />}
    </div>
  );
}
