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
      await sendEmailVerification(user);
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
  };
};

export default useAuth;
