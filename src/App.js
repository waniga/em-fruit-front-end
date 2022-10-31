import './App.css';


import Router from './route/Router';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { initialLoading } = useAuth();

  return (
    <>
      <Router />
    </>
  );
}

export default App;
