import classes from './PomodoroOptions.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const PomodoroOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const activeTimer = queryParams.get('timer') || 'pomodoro';

  const changeTimerHandler = event => {
    const clickedListItem = event.target.closest('li');
    if (!clickedListItem) return;

    const timer = clickedListItem.dataset.timer;
    navigate(`?timer=${timer}`);
  };

  const defaultClass = classes.option;
  const activeClasses = `${classes.option} ${classes['option--active']}`;
  const pomodoroClasses =
    activeTimer === 'pomodoro' ? activeClasses : defaultClass;
  const shortBreakClasses =
    activeTimer === 'shortBR' ? activeClasses : defaultClass;
  const longBreakClasses =
    activeTimer === 'longBR' ? activeClasses : defaultClass;

  return (
    <ul className={classes.options} onClick={changeTimerHandler}>
      <li className={pomodoroClasses} data-timer="pomodoro">
        pomodoro
      </li>
      <li className={shortBreakClasses} data-timer="shortBR">
        short break
      </li>
      <li className={longBreakClasses} data-timer="longBR">
        long break
      </li>
    </ul>
  );
};

export default PomodoroOptions;
