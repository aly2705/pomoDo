import classes from './Task.module.scss';
import icons from '../../assets/icons.svg';
import { taskCategories as categories } from '../../helpers/config';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, tasksActions, updateStateOfTask } from '../../store/tasks';
import { useState } from 'react';
import ConfirmAction from '../UserFeedback/ConfirmAction';
import {
  activityActions,
  updateOverviewTasksAndPomodoros,
} from '../../store/activity';
import { dateIsToday } from '../../helpers/helpers';
import useAJAX from '../../hooks/useAJAX';
import LoadingSpinner from '../UI/LoadingSpinner';

const Task = props => {
  const dispatch = useDispatch();
  const isEditing = useSelector(state => state.tasks.isEditing);
  const isLoggedIn = !!useSelector(state => state.user.token);
  const [isConfirming, setIsConfirming] = useState(false);
  const tasks = useSelector(state => state.tasks.tasks);
  const { sendRequest, isLoading } = useAJAX();

  const CSSclasses = props.dateCompleted
    ? `${classes.task} ${classes['task--done']}`
    : classes.task;

  const checkTaskHandler = () => {
    if (!props.completed) {
      if (!isLoggedIn) {
        dispatch(tasksActions.markAsCompleted(props.id));
        dispatch(
          activityActions.updateNumberOfCompletedTasks({
            operation: 'add',
            isLoggedIn,
          })
        );
        setTimeout(() => {
          dispatch(
            tasksActions.removeCompletedFromActive({
              taskId: props.id,
              isLoggedIn,
            })
          );
        }, 500);
      } else {
        dispatch(updateStateOfTask(sendRequest, props.id, true));
        dispatch(updateOverviewTasksAndPomodoros(sendRequest, 'add'));
      }
    } else {
      const dateCompleted = tasks.find(
        task => task.id === props.id
      ).dateCompleted;

      if (dateIsToday(dateCompleted)) {
        if (!isLoggedIn) {
          dispatch(
            tasksActions.cancelCompletion({ taskId: props.id, isLoggedIn })
          );
          dispatch(
            activityActions.updateNumberOfCompletedTasks({
              operation: 'subtract',
              isLoggedIn,
            })
          );
        } else {
          dispatch(updateStateOfTask(sendRequest, props.id, false));
          dispatch(updateOverviewTasksAndPomodoros(sendRequest, 'subtract'));
        }
      }
    }
  };
  const abortDeletionHandler = () => {
    setIsConfirming(false);
  };
  const deleteTaskHandler = () => {
    setIsConfirming(true);
  };

  const confirmDeletionHandler = () => {
    if (!isLoggedIn)
      dispatch(tasksActions.deleteTask({ taskId: props.id, isLoggedIn }));
    else dispatch(deleteTask(sendRequest, props.id));

    setIsConfirming(false);
  };

  const initEditTaskHandler = () => {
    dispatch(tasksActions.setEditedTask(props.id));
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
      {isEditing && (
        <div className={classes.task__options}>
          <button
            className={classes['task__edit-btn']}
            onClick={initEditTaskHandler}
          >
            <svg>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
          <button
            className={classes['task__delete-btn']}
            onClick={deleteTaskHandler}
          >
            <svg>
              <use href={`${icons}#icon-bin`}></use>
            </svg>
          </button>
        </div>
      )}
      {isConfirming && (
        <ConfirmAction
          onClose={abortDeletionHandler}
          onConfirm={confirmDeletionHandler}
        >
          Your task will be deleted
        </ConfirmAction>
      )}
      {!isEditing && (
        <button className={classes.task__checkbtn} onClick={checkTaskHandler}>
          &#10003;
        </button>
      )}
      {isLoading && <LoadingSpinner />}
    </li>
  );
};

export default Task;
