import './App.css';

import Router from './route/Router';
import { useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
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
