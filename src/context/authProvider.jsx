import { createContext, useContext, useState } from 'react';
import { apiFetch, setToken } from '../api';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('jwt'));

  const login = async (route, creds) => {
    const { token } = await apiFetch(route, {
      method: 'POST',
      body: JSON.stringify(creds)
    });
    setToken(token);
    setUser(token);
  };

  const logout = () => { setToken(null); localStorage.removeItem('jwt'); setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
