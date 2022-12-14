import './polyfills/DragDropTouch';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux/es/exports';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
serviceWorkerRegistration.register();
