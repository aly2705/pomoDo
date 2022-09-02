import classes from './Task.module.scss';
import icons from '../../img/icons.svg';
import { useState } from 'react';
import { taskCategories as categories } from '../../helpers/config';

const Task = props => {
  const [isDone, setIsDone] = useState(false);

  const CSSclasses = isDone
    ? `${classes.task} ${classes['task--done']}`
    : classes.task;

  const checkTaskHandler = () => {
    setIsDone(prevVal => !prevVal);
  };

  const category = categories.find(
    category => category.name === props.category
  );

  return (
    <li className={CSSclasses}>
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
