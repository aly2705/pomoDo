import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReducer from './mobile-menu';

const store = configureStore({
  reducer: { mobileMenu: mobileMenuReducer },
});

export default store;
