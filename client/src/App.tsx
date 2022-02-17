import React from 'react';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useRoutes } from './routes';

const App = () => {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
