import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useRoutes } from './routes';

let scrollTimeOut: NodeJS.Timeout

document.addEventListener('wheel', () => {
  clearTimeout(scrollTimeOut)
  document.querySelectorAll('.scroll').forEach(node => {
    node.classList.add("showScroll")
    scrollTimeOut = setTimeout(() => node.classList.remove("showScroll"), 1000)
  })
})


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
