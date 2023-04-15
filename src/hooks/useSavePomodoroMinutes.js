import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activityActions,
  updateOverviewHours,
  updateOverviewTasksAndPomodoros,
} from '../store/activity';
import useAJAX from './useAJAX';

const useSavePomodoroMinutes = pomodoroWasCompleted => {
  const pomodoroMinutes = useSelector(state => state.timer.config.pomodoro);
  const isLoggedIn = !!useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const { sendRequest } = useAJAX();

  useEffect(() => {
    if (pomodoroWasCompleted) {
      const usedDataInStore = {
        totalSeconds: pomodoroMinutes * 60,
        countdown: { minutes: 0, seconds: 0 },
        reinitMinutesPassed: true,
        isLoggedIn,
      };
      if (!isLoggedIn) {
        dispatch(
          activityActions.saveMinutesWhenPomodoroPaused(usedDataInStore)
        );
        dispatch(activityActions.addCompletedPomodoro(isLoggedIn));
      } else {
        dispatch(updateOverviewHours(sendRequest, usedDataInStore));
        dispatch(updateOverviewTasksAndPomodoros(sendRequest));
      }
    }
  }, [
    pomodoroWasCompleted,
    dispatch,
    pomodoroMinutes,
    isLoggedIn,
    sendRequest,
  ]);
};

export default useSavePomodoroMinutes;
