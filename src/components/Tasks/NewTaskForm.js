import classes from './NewTaskForm.module.scss';
import icons from '../../assets/icons.svg';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewTask, tasksActions, updateTaskData } from '../../store/tasks';
import useAJAX from '../../hooks/useAJAX';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewTaskForm = ({ editedTask }) => {
  const isEditing = useSelector(state => state.tasks.isEditing);
  const isLoggedIn = !!useSelector(state => state.user.token);
  const categoryRef = useRef();
  const taskRef = useRef();
  const dispatch = useDispatch();
  const { sendRequest, isLoading } = useAJAX();

  useEffect(() => {
    if (editedTask) {
      taskRef.current.value = editedTask.text;
      categoryRef.current.value = editedTask.category;
    }
  }, [editedTask]);

  const enterFormHandler = () => {
    dispatch(tasksActions.setIsEditing(true));
  };
  const exitFormHandler = () => {
    dispatch(tasksActions.setIsEditing(false));
    dispatch(tasksActions.setEditedTask(null));
  };

  const submitTaskHandler = async event => {
    event.preventDefault();

    const selectedCategory = categoryRef.current.value;
    const enteredTaskText = taskRef.current.value;

    if (selectedCategory === 'Category' && enteredTaskText.trim() === '') {
      alert('Please enter valid data');
      return;
    }
    if (selectedCategory === 'Category') {
      alert('Please enter a valid category');
      return;
    }
    if (enteredTaskText.trim() === '') {
      alert('Please enter a valid category');
      return;
    }

    if (!editedTask) {
      const task = {
        id: Date.now(),
        text: enteredTaskText,
        category: selectedCategory,
        completed: false,
        dateCompleted: null,
      };

      if (!isLoggedIn) {
        dispatch(tasksActions.addTask({ task, isLoggedIn }));
      } else {
        dispatch(postNewTask(sendRequest, task));
      }
    } else {
      const updatedTask = {
        id: editedTask.id,
        text: enteredTaskText,
        category: selectedCategory,
        completed: editedTask.completed,
        dateCompleted: editedTask.dateCompleted,
      };

      if (!isLoggedIn) {
        dispatch(tasksActions.updateTask({ updatedTask, isLoggedIn }));
      } else dispatch(updateTaskData(sendRequest, updatedTask));
      dispatch(tasksActions.setEditedTask(null));
    }
    categoryRef.current.value = 'Category';
    taskRef.current.value = '';
  };

  useEffect(() => {
    return () => {
      if (isEditing) dispatch(tasksActions.setIsEditing(false));
    };
  }, [dispatch, isEditing]);

  let content;
  if (!isEditing)
    content = (
      <Fragment>
        <div className={`${classes.icon} ${classes['icon--not-editing']}`}>
          <svg>
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
        </div>
        <button
          onClick={enterFormHandler}
          className={classes['new-task__add-btn']}
          type="button"
        >
          Add or delete tasks
        </button>
      </Fragment>
    );
  else
    content = (
      <Fragment>
        <div
          className={classes.icon}
          style={{ cursor: 'pointer' }}
          onClick={exitFormHandler}
        >
          <svg>
            <use href={`${icons}#icon-arrow-left2`}></use>
          </svg>
        </div>
        <div className={classes['new-task__form-group']}>
          <select ref={categoryRef} defaultValue="Category" required>
            <option disabled hidden value="Category">
              Category
            </option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Exercise">Exercise</option>
            <option value="Health">Health</option>
            <option value="Wellness">Wellness</option>
            <option value="Chores">Chores</option>
          </select>
          <input type="text" ref={taskRef} required placeholder="Task" />
        </div>
        <button type="submit" className={classes['new-task__submit-btn']}>
          <svg>
            <use href={`${icons}#icon-checkmark`}></use>
          </svg>
        </button>
      </Fragment>
    );

  return (
    <form onSubmit={submitTaskHandler} className={classes['new-task']}>
      {content}
      {isLoading && <LoadingSpinner />}
    </form>
  );
};

export default NewTaskForm;
