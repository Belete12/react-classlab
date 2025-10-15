import React from 'react';
import Header from '../shared/Header';
import styles from '../App.module.css';

import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <Link to="/todos">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
