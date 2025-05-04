// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../actions/authActions';   // our existing thunk
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();

  const updateDetails = (e) => {
    setDetails({
      ...details,
      [e.target.id]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(details.username, details.password));
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={submit} className="login-form bg-light p-4 rounded shadow">
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            value={details.username}
            onChange={updateDetails}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={details.password}
            onChange={updateDetails}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Sign In
        </Button>
      </Form>
    </div>
  );
}