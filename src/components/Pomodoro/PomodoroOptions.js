import classes from './PomodoroOptions.module.scss';

const PomodoroOptions = () => {
  return (
    <ul className={classes.options}>
      <li
        className={`${classes.option} ${classes['option--active']}`}
        data-timer="pomodoro"
      >
        pomodoro
      </li>
      <li className={`${classes.option}`} data-timer="short break">
        short break
      </li>
      <li className={`${classes.option}`} data-timer="long break">
        long break
      </li>
    </ul>
  );
};

export default PomodoroOptions;
