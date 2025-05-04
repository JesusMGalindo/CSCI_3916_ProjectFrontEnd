// src/components/Authentication.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import Login from './login';
import Register from './register';
import { login, register, logout } from '../actions/authActions';

export default function Authentication() {
  const dispatch = useDispatch();
  const token    = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);

  const location = useLocation();
  const navigate = useNavigate();

  // Determine which tab based on the URL hash
  const current = location.pathname.includes('signup') ? 'signup' : 'login';

  // Switch the URL when the user clicks a tab
  const handleSelect = (key) => {
    navigate(`/${key}`);
  };

  // If already logged in, show a logout button instead of the form
  if (token) {
    return (
      <div className="text-center mt-5">
        Logged in as <strong>{username}</strong>
        <Button variant="outline-secondary" className="ms-3" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>
    );
  }

  // Otherwise show the Login/Register tabs
  return (
    <div className="auth-container">
      <Nav
        variant="tabs"
        activeKey={current}
        onSelect={handleSelect}
        className="mb-4 justify-content-center"
      >
        <Nav.Item>
          <Nav.Link eventKey="login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signup">Signup</Nav.Link>
        </Nav.Item>
      </Nav>

      {current === 'signup' ? <Register /> : <Login />}
    </div>
  );
}
