import React, { useState } from 'react';
import { registerUser } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

export default function Register() {
  const [details, setDetails] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();

  const updateDetails = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(details));
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={submit} className="register-form bg-light p-4 rounded shadow">
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            value={details.name}
            onChange={updateDetails}
          />
        </Form.Group>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a username"
            value={details.username}
            onChange={updateDetails}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="you@example.com"
            value={details.email}
            onChange={updateDetails}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={details.password}
            onChange={updateDetails}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Register
        </Button>
      </Form>
    </div>
  );
}
