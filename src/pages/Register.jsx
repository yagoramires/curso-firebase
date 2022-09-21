import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Auth.module.css';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';


const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [error, setError] = useState();

  const { register, error: registerError, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }

    const user = {
      email,
      password,
    };
    register(user);
  };

  useEffect(() => {
    if (registerError) {
      setError(registerError);
    }
  }, [registerError]);

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
        <label>
          <span>Confirmação de senha</span>
          <input
            type='password'
            value={confirmPassword || ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        {!loading && <input type='submit' value='Cadastrar' />}
        
        {loading && (
          <div >
            <AiOutlineLoading3Quarters className="loading" size={40}/>
          </div>
        )}

        {error && <p className='error'>{error}</p>}
      </form>

      <p>
        Já possui conta? <Link to='/login'>Entre</Link>
      </p>
    </div>
  );
};

export default Register;
