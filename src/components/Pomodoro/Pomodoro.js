import classes from './Pomodoro.module.scss';
import PomodoroOptions from './PomodoroOptions';
import PomodoroTimer from './PomodoroTimer';

const Pomodoro = () => {
  return (
    <div className={classes.pomodoro}>
      <PomodoroOptions />
      <PomodoroTimer />
    </div>
  );
};

export default Pomodoro;
