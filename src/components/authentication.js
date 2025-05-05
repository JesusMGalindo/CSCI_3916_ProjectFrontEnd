// src/components/Authentication.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { Login, Register } from '../actions/authActions';
import Login from './Login';
import Register from './Register';

export default function Authentication() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((s) => s.auth.loggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  // Decide which tab to show based on URL
  const current = location.pathname.includes('signup') ? 'signup' : 'signin';

  // If we become logged in, redirect to the board
  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  // Tab click = change hash URL
  const handleSelect = (key) => {
    navigate(`/${key}`, { replace: true });
  };

  // If already logged in, don’t render forms at all
  if (loggedIn) return null;

  return (
    <div className="auth-container">
      <Nav
        variant="tabs"
        activeKey={current}
        onSelect={handleSelect}
        className="mb-4 justify-content-center"
      >
        <Nav.Item>
          <Nav.Link eventKey="signin">Sign In</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signup">Sign Up</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Render the appropriate form */}
      {current === 'signup' ? <Register /> : <Login />}
    </div>
  );
}
