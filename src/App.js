import './App.css';

import Router from './route/Router';
import { useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Spinner from './components/ui/Spinner';

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading) return <Spinner />;

  return (
    <>
      <Router />
      <ToastContainer
        autoClose={2000}
        theme="colored"
        position="bottom-center"
      />
    </>
  );
}

export default App;
