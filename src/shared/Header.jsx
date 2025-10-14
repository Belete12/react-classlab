import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>
        {' | '}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
