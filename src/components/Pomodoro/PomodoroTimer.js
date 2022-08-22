import classes from './PomodoroTimer.module.scss';

const PomodoroTimer = () => {
  return (
    <div className={classes.timer}>
      <div className={classes.timer__circular}>
        <div className={classes['timer__inner-circle']}>
          <div className={classes.timer__center}>
            <div className={classes.timer__countdown}>
              <span className={classes.timer__min}>25</span>:
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
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
