import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import styles from './Header.module.css';

const header = ({ user }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link>
        <span>todo</span>List
      </Link>

      {!user && (
        <nav>
          <ul>
            <li>
              <NavLink to='login'>Entre</NavLink>
            </li>
            <li>
              <NavLink to='register'>Registre-se</NavLink>
            </li>
          </ul>
        </nav>
      )}

      {user && (
        <nav>
          <ul>
            <li>
              <a href='/' onClick={logout}>
                Sair
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default header;
