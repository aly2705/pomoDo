import React from 'react';
import classes from './LoadingSpinner.module.scss';
import ReactDOM from 'react-dom';

const LoadingSpinner = () => {
  return ReactDOM.createPortal(
    <div className={classes.loading}></div>,
    document.getElementById('overlays')
  );
};

export default LoadingSpinner;
