import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReducer from './mobile-menu';
import timerReducer from './timer';
import tasksReducer from './tasks';
import activityReducer from './activity';

const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    timer: timerReducer,
    tasks: tasksReducer,
    activity: activityReducer,
  },
});
export default store;
