import React from 'react';
import Pomodoro from '../components/Pomodoro/Pomodoro';
import Taskbar from '../components/Tasks/Taskbar';

const PomodoroPage = () => {
  return (
    <React.Fragment>
      <Pomodoro />
      <Taskbar />
    </React.Fragment>
  );
};

export default PomodoroPage;
