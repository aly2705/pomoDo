import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timer';
import tasksReducer from './tasks';
import activityReducer from './activity';
import calendarReducer from './calendar';
import userReducer from './user';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    tasks: tasksReducer,
    activity: activityReducer,
    calendar: calendarReducer,
    user: userReducer,
  },
});
export default store;
