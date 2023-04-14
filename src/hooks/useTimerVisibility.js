import { useEffect, useRef } from 'react';
import { dateIsToday } from '../helpers/helpers';
import { timerActions } from '../store/timer';
import { useDispatch } from 'react-redux';

/**
 * custom hook that encapsulates an effect that registers timer activity when page is inactive, 
 to prevent timer desynchronization when page becomes inactive
 * @param {boolean} timerIsActive state variable that the effect depends on
 * @param {string} pageVisibility state variable that triggers effect
 * @param {number} secondsOutsidePomodoro state variable that needs to be remembered and reset when page becomes visible again
 */

const useTimerVisibility = (
  timerIsActive,
  pageVisibility,
  secondsOutsidePomodoro
) => {
  const dispatch = useDispatch();
  const secondsOutsidePomodoroRef = useRef(secondsOutsidePomodoro);

  useEffect(() => {
    if (document.visibilityState === 'hidden' && timerIsActive) {
      dispatch(timerActions.toggleIsActive());
      localStorage.setItem('startOfInactive', JSON.stringify(Date.now()));
    }
    if (
      document.visibilityState === 'visible' &&
      localStorage.getItem('startOfInactive')
    ) {
      const storedTimestamp = JSON.parse(
        localStorage.getItem('startOfInactive')
      );
      const secondsPassed = Math.trunc((Date.now() - storedTimestamp) / 1000);

      if (dateIsToday(storedTimestamp)) {
        dispatch(timerActions.toggleIsActive());
        dispatch(
          timerActions.subtractOutsideSeconds(
            secondsPassed + secondsOutsidePomodoroRef.current
          )
        );
        secondsOutsidePomodoroRef.current = 0;
      }
      localStorage.removeItem('startOfInactive');
    }
  }, [pageVisibility, dispatch, timerIsActive]);
};

export default useTimerVisibility;
