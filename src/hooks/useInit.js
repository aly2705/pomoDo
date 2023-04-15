import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../store/timer';
import { fetchTasksData, tasksActions } from '../store/tasks';
import { userActions } from '../store/user';
import { calendarActions, fetchCalendarData } from '../store/calendar';
import { activityActions, fetchAndInitActivity } from '../store/activity';
import { dateIsToday, dateIsYesterday, getData } from '../helpers/helpers';
import useAJAX from './useAJAX';

const useInit = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const { sendRequest, error, isLoading } = useAJAX();

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      dispatch(userActions.getUserData());
    }
    if (localStorage.getItem('timer')) {
      dispatch(timerActions.getTimerData());
    }
  }, [dispatch]);

  useEffect(() => {
    const isLoggedIn = !!token;
    if (isLoggedIn) {
      // console.log('User logged in. Fetching data...');
      // Fetch tasks
      dispatch(fetchTasksData(sendRequest));
      //Fetch calendar
      dispatch(fetchCalendarData(sendRequest));
      // Fetch activity
      dispatch(fetchAndInitActivity(sendRequest));
    } else {
      // console.log('Guest mode. Using local storage');
      if (localStorage.getItem('tasks')) {
        dispatch(tasksActions.getTasksData());
      }
      if (localStorage.getItem('calendar')) {
        dispatch(calendarActions.getCalendarData());
      }
      if (localStorage.getItem('activity')) {
        const storedActivity = getData('activity');
        if (dateIsToday(storedActivity.date)) {
          dispatch(activityActions.getActivityData());
        } else {
          dispatch(calendarActions.insertActivityData(storedActivity));
          dispatch(timerActions.changeTimer('pomodoro'));
          if (!dateIsYesterday(storedActivity.date))
            // insert null data for yesterday so the statistics will update with the correct data
            dispatch(calendarActions.insertYesterdayData());
        }
      }
    }
  }, [dispatch, token, sendRequest]);

  return { error, isLoading };
};

export default useInit;
