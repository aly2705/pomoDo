import classes from './PomodoroTimer.module.scss';
import '../../styles/abstracts.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const findNumberOfMinutes = timerType => {
  if (!timerType) return { minutes: 0, seconds: 30 };
  return timerType === 'pomodoro'
    ? { minutes: 25, seconds: 0 }
    : timerType === 'shortBR'
    ? { minutes: 5, seconds: 0 }
    : { minutes: 10, seconds: 0 };
};

const PomodoroTimer = () => {
  const location = useLocation();
  const [wasClicked, setWasClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const activeTimer = queryParams.get('timer');
  const initialTimer = findNumberOfMinutes(activeTimer);

  const [timer, setTimer] = useState(initialTimer);
  const [percentage, setPercentage] = useState(0);
  const totalSeconds = initialTimer.minutes * 60 + initialTimer.seconds;
  console.log(totalSeconds);

  const clickTimerHandler = () => {
    // Animation
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
    }, 300);
    setIsActive(prevState => !prevState);
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer.minutes === 0 && prevTimer.seconds === 0) {
            clearInterval(interval);
            return {
              minutes: 0,
              seconds: 0,
            };
          }
          if (prevTimer.seconds === 0) {
            return {
              minutes: prevTimer.minutes - 1,
              seconds: 59,
            };
          }
          return {
            minutes: prevTimer.minutes,
            seconds: prevTimer.seconds - 1,
          };
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isActive]);

  useEffect(() => {
    const secondsCompleted = totalSeconds - timer.minutes * 60 - timer.seconds;
    setPercentage((secondsCompleted / totalSeconds) * 100);
  }, [timer, totalSeconds]);

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
            <span className={classes.timer__min}>{timer.minutes}</span>:
            <span className={classes.timer__sec}>
              {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
            </span>
          </div>
          <button className={classes.timer__btn} onClick={clickTimerHandler}>
            {isActive ? 'Pause' : 'Start'}
          </button>
        </div>
        {/* <div className={classes['timer__inner-circle']}>
          <div className={classes.timer__center}>
            <div className={classes.timer__countdown}>
              <span className={classes.timer__min}>{timerMin}</span>:
              <span className={classes.timer__sec}>00</span>
            </div>
            <button className={classes.timer__btn}>Pause</button>
          </div>
        </div>

        <div className={classes['timer__progress-bar']}>
          <div
            className={`${classes.timer__bar} ${classes['timer__bar--left']}`}
          >
            <div
              className={`${classes.timer__progress} ${classes['timer__progress--left']}`}
            ></div>
          </div>
          <div
            className={`${classes.timer__bar} ${classes['timer__bar--right']}`}
          >
            <div
              className={`${classes.timer__progress} ${classes['timer__progress--right']}`}
            ></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PomodoroTimer;
