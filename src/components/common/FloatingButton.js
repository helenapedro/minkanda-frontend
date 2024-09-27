import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/FloatingButton.module.css';

const FloatingButton = ({ to }) => {
  return (
    <Link to={to} className={styles['floating-btn']}>
      +
    </Link>
  );
};

export default FloatingButton;