import Task from './Task';
import classes from './Tasks.module.scss';
import Card from '../UI/Card';
import NewTaskForm from './NewTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Fragment, useRef, useState } from 'react';
import { tasksActions } from '../../store/tasks';

const Tasks = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [infoCardIsShown, setInfoCardIsShown] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStartHandler = (event, index) => {
    //We use index to identify the position of dragged in list
    dragItem.current = index;
    event.target.closest('li').style.opacity = 0.5;
  };
  const dragEnterHandler = (event, index) => {
    event.preventDefault();
    dragOverItem.current = index;
  };
  const dropHandler = event => {
    event.target.closest('li').style.opacity = 1;
    const draggedAndDraggedOverIndexes = {
      dragItemIndex: dragItem.current,
      dragOverIndex: dragOverItem.current,
    };
    dispatch(tasksActions.replaceListOnDrop(draggedAndDraggedOverIndexes));
  };

  const toggleInfoCardHandler = () => {
    setInfoCardIsShown(prevState => !prevState);
  };

  const queryParams = new URLSearchParams(location.search);
  const sortCriteria = queryParams.get('sort');

  let computedTasks = tasks;
  let tasksList;
  if (sortCriteria) {
    if (sortCriteria === 'Ongoing') {
      computedTasks = tasks.filter(task => !task.completed);
    } else if (sortCriteria === 'Completed') {
      computedTasks = tasks.filter(task => task.completed);
    } else computedTasks = tasks.filter(task => task.category === sortCriteria);
    tasksList = computedTasks.map(task => (
      <Task
        key={task.id}
        id={task.id}
        completed={task.completed}
        category={task.category}
        draggable={false}
      >
        {task.text}
      </Task>
    ));
  } else {
    tasksList = computedTasks.map((task, index) => (
      <Task
        key={task.id}
        id={task.id}
        completed={task.completed}
        category={task.category}
        draggable
        onDragStart={e => dragStartHandler(e, index)}
        onDragEnter={e => dragEnterHandler(e, index)}
        onDragEnd={dropHandler}
      >
        {task.text}
      </Task>
    ));
  }

  return (
    <Card className={classes.tasks}>
      <h2>Tasks</h2>
      {sortCriteria && (
        <Link to="/tasks" className={`btn-link ${classes.tasks__btn}`}>
          Show all
        </Link>
      )}
      {!sortCriteria && (
        <Fragment>
          <button
            onClick={toggleInfoCardHandler}
            className={`${classes.info} ${classes.tasks__btn}`}
          >
            i
          </button>
          {infoCardIsShown && (
            <div className={classes.info__message}>
              <p>Drag and drop tasks to arrange by priority</p>
            </div>
          )}
        </Fragment>
      )}
      <ul>{tasksList.length === 0 ? <p>No tasks found</p> : tasksList}</ul>
      <NewTaskForm />
    </Card>
  );
};

export default Tasks;