import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title }) => {
  return (
    // <header>
    //   <h1>{title}</h1>
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* <nav> */}
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
      {/* <h1 className={styles.title}>{title}</h1> */}
    </header>
  );
};

export default Header;
