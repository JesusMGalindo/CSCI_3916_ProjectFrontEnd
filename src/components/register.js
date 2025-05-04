// src/components/Register.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { Navigate, Link } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const loggedIn  = useSelector((s) => Boolean(s.auth.token));

  const [form, setForm] = useState({ name:'', username:'', email:'', password:'' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); dispatch(register(form)); };

  if (loggedIn) return <Navigate to="/" />;

  return (
    <main className="register">
      <h2>Create Account</h2>
      <form onSubmit={onSubmit}>
        <input name="name"     placeholder="Full name" value={form.name}     onChange={onChange} />
        <input name="username" placeholder="Username"  value={form.username} onChange={onChange} />
        <input name="email"    placeholder="Email"     value={form.email}    onChange={onChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
        <button type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </main>
  );
}
