import classes from './Task.module.scss';
import icons from '../../img/icons.svg';
import { useState } from 'react';

const Task = props => {
  const [isDone, setIsDone] = useState(false);

  const CSSclasses = isDone
    ? `${classes.task} ${classes['task--done']}`
    : classes.task;

  const checkTaskHandler = () => {
    setIsDone(prevVal => !prevVal);
  };

  return (
    <li className={CSSclasses}>
      <div className={classes.task__icon}>
        <svg>
          <use href={`${icons}${props.category.icon}`}></use>
        </svg>
      </div>
      <div className={classes.task__details}>
        <span className={classes.task__title}>{props.children}</span>
        <span className={classes.task__category}>{props.category.name}</span>
      </div>
      <button className={classes.task__checkbtn} onClick={checkTaskHandler}>
        {' '}
        &#10003;
      </button>
    </li>
  );
};

export default Task;
