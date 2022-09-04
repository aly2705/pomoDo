import classes from './Task.module.scss';
import icons from '../../img/icons.svg';
import { taskCategories as categories } from '../../helpers/config';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store/tasks';

const Task = props => {
  const dispatch = useDispatch();

  const CSSclasses = props.completed
    ? `${classes.task} ${classes['task--done']}`
    : classes.task;

  const checkTaskHandler = () => {
    dispatch(tasksActions.markAsCompleted(props.id));
  };

  const category = categories.find(
    category => category.name === props.category
  );

  return (
    <li
      className={CSSclasses}
      draggable={props.draggable}
      onDragStart={props.onDragStart || null}
      onDragEnter={props.onDragEnter || null}
      onDragEnd={props.onDragEnd || null}
      onDragOver={e => e.preventDefault()}
    >
      <div className={classes.task__icon}>
        <svg>
          <use href={`${icons}${category.icon}`}></use>
        </svg>
      </div>
      <div className={classes.task__details}>
        <span className={classes.task__title}>{props.children}</span>
        <span className={classes.task__category}>{category.name}</span>
      </div>
      <button className={classes.task__checkbtn} onClick={checkTaskHandler}>
        &#10003;
      </button>
    </li>
  );
};

export default Task;
