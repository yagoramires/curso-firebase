import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import styles from './PasswordRecover.module.css';

import {AiOutlineLoading3Quarters} from 'react-icons/ai';

const PasswordRecover = ({insertedEmail,modalActive, setModalActive}) => {
  const [email, setEmail] = useState(insertedEmail);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const { resetPassword, loading, error: resetError, message: resetMessage} = useAuth();

  const handleResetPassword = (e)=>{
    e.preventDefault();
    resetPassword(email)
  }

  useEffect(() => {
    if (resetError) {
      setError(resetError);
    }
    if (resetMessage) {
      setMessage(resetMessage);
    }
  }, [resetError, resetMessage]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [error,message]);

  return (
    <form className={modalActive ? styles.passwordRecover : 'hidden'} onSubmit={handleResetPassword}>
      <span onClick={()=>setModalActive(false)}>x</span>
      <label>
        <span>E-mail:</span>
        <input type="email" value={email || ''} onChange={(e)=> setEmail(e.target.value)}/>
      </label>
      {!loading && (
      <input type="submit" value='Enviar' />

      )}
      
      {loading && (
          <div >
            <AiOutlineLoading3Quarters className="loading" size={40}/>
          </div>
        )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default PasswordRecover