import classes from './Taskbar.module.scss';
import Task from './Task';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';

const Taskbar = () => {
  return (
    <Card className={classes.taskbar}>
      <h2>My tasks</h2>
      <Link to="/tasks" className={classes.taskbar__btn}>
        View all
      </Link>
      <ul>
        <Task category="Study">
          Finish at least one chapter in the course book
        </Task>
        <Task category="Exercise">Workout 3 times this week</Task>
        <Task category="Wellness">Dine out with old friends</Task>
        <Task category="Chores">Clean the bathroom thoroughly</Task>
      </ul>
    </Card>
  );
};

export default Taskbar;
