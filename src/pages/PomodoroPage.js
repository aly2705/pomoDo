import { Fragment } from 'react';
import Pomodoro from '../components/Pomodoro/Pomodoro';
import Taskbar from '../components/Tasks/Taskbar';

const PomodoroPage = () => {
  return (
    <Fragment>
      <Pomodoro />
      <Taskbar />
    </Fragment>
  );
};

export default PomodoroPage;
