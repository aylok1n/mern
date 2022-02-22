import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useRoutes } from './routes';

const App = () => {
  const auth = useAuth()
  const routes = useRoutes(auth)

  return (
    <AuthContext.Provider value={auth}>
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
