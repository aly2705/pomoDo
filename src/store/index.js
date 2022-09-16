import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReducer from './mobile-menu';
import timerReducer from './timer';
import tasksReducer from './tasks';
import activityReducer from './activity';
import calendarReducer from './calendar';

const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    timer: timerReducer,
    tasks: tasksReducer,
    activity: activityReducer,
    calendar: calendarReducer,
  },
});
export default store;
