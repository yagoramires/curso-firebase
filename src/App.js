import { useLayoutEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, async (userParams) => {
      setUser(userParams);
    });
  }, [auth]);

  if (user === undefined) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='App'>
      <Header user={user} />
      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <Home verified={user.emailVerified} user={user} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/profile'
          element={user ? <Profile user={user} /> : <Navigate to='/' />}
        />
      </Routes>
    </div>
  );
}

export default App;
