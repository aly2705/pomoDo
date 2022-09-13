import classes from './PomodoroTimer.module.scss';
import '../../styles/abstracts.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timerActions } from '../../store/timer';

// const findNumberOfMinutes = timerType => {
//   if (!timerType) return { minutes: 0, seconds: 30 };
//   return timerType === 'pomodoro'
//     ? { minutes: 25, seconds: 0 }
//     : timerType === 'shortBR'
//     ? { minutes: 5, seconds: 0 }
//     : { minutes: 10, seconds: 0 };
// };

const PomodoroTimer = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.timer.isActive);
  const countdown = useSelector(state => state.timer.countdown);
  const totalSeconds = useSelector(state => state.timer.totalSeconds);
  const [wasClicked, setWasClicked] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const activeTimer = queryParams.get('timer');
  // const initialTimer = findNumberOfMinutes(activeTimer);

  // const [timer, setTimer] = useState(initialTimer);

  //const totalSeconds = initialTimer.minutes * 60 + initialTimer.seconds;

  const clickTimerHandler = () => {
    // Animation
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
    }, 300);
    dispatch(timerActions.toggleIsActive());
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        dispatch(timerActions.countdown(interval));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isActive, dispatch]);

  useEffect(() => {
    const secondsCompleted =
      totalSeconds - countdown.minutes * 60 - countdown.seconds;
    const newPercentage = (secondsCompleted / totalSeconds) * 100;
    setPercentage(newPercentage);
  }, [countdown, totalSeconds, dispatch]);

  return (
    <div className={`${classes.timer} ${wasClicked ? 'clicked' : ''}`}>
      <div className={classes.timer__circular}>
        <svg
          className={classes['circle-container']}
          viewBox="2 -2 28 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={classes['circle-container__background']}
            r="16"
            cx="16"
            cy="16"
          ></circle>
          <circle
            className={classes['circle-container__progress']}
            r="16"
            cx="16"
            cy="16"
            style={{ strokeDashoffset: percentage }}
          ></circle>
        </svg>
        <div className={classes.timer__center}>
          <div className={classes.timer__countdown}>
            <span className={classes.timer__min}>{countdown.minutes}</span>:
            <span className={classes.timer__sec}>
              {countdown.seconds < 10
                ? `0${countdown.seconds}`
                : countdown.seconds}
            </span>
          </div>
          <button className={classes.timer__btn} onClick={clickTimerHandler}>
            {isActive ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
