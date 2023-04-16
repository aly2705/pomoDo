import React from 'react';
import ReactDOM from 'react-dom';

const ErrorAlert = ({ error }) => {
  return ReactDOM.createPortal(
    <p className="error-message error-message--alert">{error.message}</p>,
    document.getElementById('overlays')
  );
};

export default ErrorAlert;
