import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import useAuth from '../hooks/useAuth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './Home.module.css'

const Home = ({ verified, user }) => {
  const { verifyEmail, loading, error: verifyError, message } = useAuth();

  const [error, setError] = useState();

  useEffect(() => {
    if (verifyError) {
      setError(verifyError);
    }
  }, [verifyError]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  if (verified === false) {
    return (
      <div className={styles.verify}>
        <h3>Verifique seu e-mail para poder utilizar o app.</h3>

        {!loading && <button onClick={() => verifyEmail(user)}>Enviar</button>}

        {loading && (
          <div>
            <AiOutlineLoading3Quarters className='loading' size={40} />
          </div>
        )}
        {error && <p className='error'>{error}</p>}
        {message && <p className='success'>{message}</p>}
      </div>
    );
  }
  return <Form />;
};

export default Home;
