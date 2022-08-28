import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReducer from './mobile-menu';
import timerReducer from './timer';

const store = configureStore({
  reducer: { mobileMenu: mobileMenuReducer, timer: timerReducer },
});

export default store;
