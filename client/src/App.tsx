import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useRoutes } from './routes';

const App = () => {
  const auth = useAuth()
  const authContextValue = { ...auth, isAuthenticated: !!auth.token }
  const routes = useRoutes(authContextValue)

  return (
    <AuthContext.Provider value={authContextValue}>
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
