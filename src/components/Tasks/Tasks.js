import Task from './Task';
import classes from './Tasks.module.scss';
import Card from '../UI/Card';
import NewTaskForm from './NewTaskForm';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sortCriteria = queryParams.get('sort');

  let computedTasks = tasks;
  if (sortCriteria) {
    if (sortCriteria === 'Ongoing') {
      computedTasks = tasks.filter(task => !task.completed);
    } else if (sortCriteria === 'Completed') {
      computedTasks = tasks.filter(task => task.completed);
    } else computedTasks = tasks.filter(task => task.category === sortCriteria);
  }
  const tasksList = computedTasks.map(task => (
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
    <Card className={classes.tasks}>
      <h2>Tasks</h2>
      {sortCriteria && (
        <Link to="/tasks" className={`btn-link ${classes.tasks__btn}`}>
          Show all
        </Link>
      )}
      <ul>{tasksList.length === 0 ? <p>No tasks found</p> : tasksList}</ul>
      <NewTaskForm />
    </Card>
  );
};

export default Tasks;
