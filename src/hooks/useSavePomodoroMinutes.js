import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activityActions } from '../store/activity';

const useSavePomodoroMinutes = pomodoroWasCompleted => {
  const pomodoroMinutes = useSelector(state => state.timer.config.pomodoro);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pomodoroWasCompleted) {
      dispatch(activityActions.addCompletedPomodoro());
      dispatch(
        activityActions.saveMinutesWhenPomodoroPaused({
          totalSeconds: pomodoroMinutes * 60,
          countdown: { minutes: 0, seconds: 0 },
          reinitMinutesPassed: true,
        })
      );
    }
  }, [pomodoroWasCompleted, dispatch, pomodoroMinutes]);
};

export default useSavePomodoroMinutes;
