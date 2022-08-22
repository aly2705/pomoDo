import classes from './Task.module.scss';
import icons from '../../img/icons.svg';

const Task = props => {
  const CSSclasses = props.done
    ? `${classes.task} ${classes['task--done']}`
    : classes.task;

  return (
    <li className={CSSclasses}>
      <div className={classes.task__icon}>
        <svg>
          <use href={`${icons}#icon-book`}></use>
        </svg>
      </div>
      <div className={classes.task__details}>
        <span className={classes.task__title}>{props.children}</span>
        <span className={classes.task__category}>Category</span>
      </div>
      <button className={classes.task__checkbtn}> &#10003;</button>
    </li>
  );
};

export default Task;
