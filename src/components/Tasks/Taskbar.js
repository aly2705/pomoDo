import classes from './Taskbar.module.scss';
import Task from './Task';

const Taskbar = () => {
  return (
    <aside className={classes.taskbar}>
      <h2>My tasks</h2>
      <button className={classes.taskbar__btn}>View all</button>
      <ul>
        <Task done>This is the first task that i have done so far</Task>
        <Task>This is the second task</Task>
        <Task>This is the third task</Task>
        <Task>This is the fourth task</Task>
      </ul>
    </aside>
  );
};

export default Taskbar;
