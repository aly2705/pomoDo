import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReducer from './mobile-menu';
import timerReducer from './timer';
import tasksReducer from './tasks';

const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    timer: timerReducer,
    tasks: tasksReducer,
  },
});
export default store;
