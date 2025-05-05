import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

export default function Signup() {
  const [f,s] = useState({ username:'', email:'', password:'' });
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = e=>{
    e.preventDefault();
    login('/signup', f).then(()=>nav('/'));
  };

  return (
    <form onSubmit={submit} className="auth">
      <h2>Register</h2>
      <input placeholder="username" onChange={e=>s({...f,username:e.target.value})}/>
      <input placeholder="email" onChange={e=>s({...f,email:e.target.value})}/>
      <input type="password" placeholder="password" onChange={e=>s({...f,password:e.target.value})}/>
      <button>Sign up</button>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
