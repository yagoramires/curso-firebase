import db from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';

import { useState } from 'react';

const useAuth = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const auth = getAuth();
  auth.languageCode = 'pt-BR';
  const actionCodeSettings = {
    url: 'http://192.168.1.8:3000',
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await user.sendEmailVerification();
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const login = async (user) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const verifyEmail = async (user) => {
    setLoading(true);

    try {
      await sendEmailVerification(user, actionCodeSettings);
      setMessage(
        'E-mail de validação reenviado com sucesso. Por favor verifique sua caixa de entrada ou spam.'
      );
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage(
        'E-mail enviado com sucesso, verifique sua caixa de entrada ou spam.'
      );
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const updateUser = async (user, data) => {
    setLoading(true);

    try {
      await updateProfile(user, data);
      setMessage('Dados atualizados com sucesso!');
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return {
    auth,
    loading,
    error,
    message,
    register,
    verifyEmail,
    login,
    logout,
    resetPassword,
    updateUser,
  };
};

export default useAuth;
