import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Auth.module.css';

import PasswordRecover from '../components/PasswordRecover'

import {AiOutlineLoading3Quarters} from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [modalActive, setModalActive] = useState(false);

  const { login, error: loginError, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    login(user);
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <div className={styles.authForm}>
      <span>Entre para continuar</span>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail</span>
          <input
            type='email'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type='password'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {!loading && <input type='submit' value='Entrar' />}

        {loading && (
          <div >
            <AiOutlineLoading3Quarters className="loading" size={40}/>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </form>

      <p>
        Esqueceu sua senha? <button onClick={()=>setModalActive(true)}> Recupere-a </button>
      </p>

      <p>
        Não possui conta? <Link to='/register'>Registre-se</Link>
      </p>
      <PasswordRecover modalActive={modalActive} setModalActive={setModalActive} insertedEmail={email}/>
    </div>
  );
};

export default Login;
