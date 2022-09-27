import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';

import UnknownUser from '../assets/unknownUser.png';
import useAuth from '../hooks/useAuth';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Profile = ({ user }) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    updateUser,
    loading,
    error: updateError,
    message: updateMessage,
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(image) {
      try {
       let url = new URL(image)
     } catch(err) {
         setError("Invalid URL!")
         return
     }
   }

    const data = {
      displayName: name,
      photoURL: image,
    };

    updateUser(user, data);
  };

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setName(user.displayName);
      }
      if (user.photoURL) {
        setImage(user.photoURL);
      }
    }
  }, [user]);

  return (
    <div className={styles.profile}>
      <img src={user.photoURL ? user.photoURL : UnknownUser} alt='' />
      <h1>{user && user.displayName}</h1>

      <h2>Editar:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type='text'
            value={name || ''}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder='Nome'
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input type='email' value={user && user.email} disabled />
        </label>
        <label>
          <span>Imagem de perfil:</span>
          <input
            type='text'
            value={image || ''}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder='URL'
          />
        </label>
        {!loading && <input type='submit' value='Atualizar' />}

        {loading && (
          <div>
            <AiOutlineLoading3Quarters className='loading' size={40} />
          </div>
        )}

        {message && <p className='success'>{message}</p>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Profile;
