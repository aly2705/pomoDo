import classes from './Taskbar.module.scss';
import Task from './Task';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Taskbar = () => {
  const tasks = useSelector(state => state.tasks.tasks);

  const tasksList = tasks.slice(0, 4).map(task => (
    <Task
      key={task.id}
      id={task.id}
      completed={task.completed}
      category={task.category}
    >
      {task.text}
    </Task>
  ));
  return (
    <Card className={classes.taskbar}>
      <h3>My tasks</h3>
      <Link to="/tasks" className="btn-link">
        View all
      </Link>
      <ul>{tasksList}</ul>
    </Card>
  );
};

export default Taskbar;
