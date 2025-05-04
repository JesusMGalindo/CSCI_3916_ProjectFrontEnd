// src/components/Login.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { Navigate, Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const loggedIn  = useSelector((s) => Boolean(s.auth.token));

  const [form, setForm] = useState({ username: '', password: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); dispatch(login(form.username, form.password)); };

  if (loggedIn) return <Navigate to="/" />;

  return (
    <main className="login">
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={onChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </main>
  );
}
