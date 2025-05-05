import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

export default function Login() {
  const [form, set] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = e => {
    e.preventDefault();
    login('/signin', form).then(() => nav('/'));
  };

  return (
    <form onSubmit={submit} className="auth">
      <h2>Login</h2>
      <input placeholder="username" onChange={e=>set({...form,username:e.target.value})}/>
      <input type="password" placeholder="password" onChange={e=>set({...form,password:e.target.value})}/>
      <button>Sign in</button>
      <p>No account? <Link to="/signup">Register</Link></p>
    </form>
  );
}
