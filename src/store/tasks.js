import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';
import { API_URL } from '../helpers/config';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    isEditing: false,
    editedTaskId: null,
    tasks: [
      {
        id: 'task1',
        completed: false,
        category: 'Study',
        text: 'Complete my first pomodoro',
        dateCompleted: null,
      },
      {
        id: 'task2',
        completed: false,
        category: 'Study',
        text: 'Add my first task',
        dateCompleted: null,
      },
      {
        id: 'task3',
        completed: false,
        category: 'Study',
        text: 'Continue exploring the app',
        dateCompleted: null,
      },
      {
        id: 'task4',
        completed: true,
        category: 'Wellness',
        text: 'Log for the first time!',
        dateCompleted: new Date().toISOString(),
      },
    ],
  },
  reducers: {
    addTask(state, action) {
      const { task, isLoggedIn } = action.payload;
      const firstCompletedTaskIndex = state.tasks.findIndex(
        task => task.completed
      );
      if (firstCompletedTaskIndex === -1) {
        state.tasks.push(task);
      } else state.tasks.splice(firstCompletedTaskIndex, 0, task); //inserts at the end of uncompleted tasks

      if (!isLoggedIn) persistData('tasks', state);
    },
    updateTask(state, action) {
      const { updatedTask, isLoggedIn } = action.payload;
      const taskIndex = state.tasks.findIndex(
        task => task.id === updatedTask.id
      );
      state.tasks[taskIndex] = updatedTask;

      if (!isLoggedIn) persistData('tasks', state);
    },
    markAsCompleted(state, action) {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);

      state.tasks.at(taskIndex).dateCompleted = new Date().toISOString();
    },
    removeCompletedFromActive(state, action) {
      const { taskId, isLoggedIn } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      state.tasks.at(taskIndex).completed = true;
      const task = state.tasks.at(taskIndex);
      state.tasks.splice(taskIndex, 1); //cuts from tasks the marked element
      state.tasks.push(task); //inserts at the end the task
      if (!isLoggedIn) persistData('tasks', state);
    },
    cancelCompletion(state, action) {
      const { taskId, isLoggedIn } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      const task = state.tasks.at(taskIndex);

      task.completed = false;
      task.dateCompleted = null;

      if (
        state.tasks.filter(task => task.completed).length === 0 &&
        !isLoggedIn
      ) {
        persistData('tasks', state);
        return;
      }
      state.tasks.splice(taskIndex, 1); //cuts from tasks the marked element
      const firstCompletedTaskIndex = state.tasks.findIndex(
        task => task.completed
      );
      const indexToInsertTo =
        firstCompletedTaskIndex !== -1
          ? firstCompletedTaskIndex
          : state.tasks.length - 1;

      state.tasks.splice(indexToInsertTo, 0, task); //inserts at the end of the uncompleted tasks list

      if (!isLoggedIn) persistData('tasks', state);
    },
    getTasksData(state) {
      const storedData = getData('tasks');
      state.tasks = storedData.tasks;
    },
    replaceListOnDrop(state, action) {
      const { dragItemIndex, dragOverIndex, isLoggedIn } = action.payload;
      const dragItemContent = state.tasks[dragItemIndex]; //saves content of draggedItem
      state.tasks.splice(dragItemIndex, 1); //cuts from tasks the dragged element
      state.tasks.splice(dragOverIndex, 0, dragItemContent); //inserts at dragOverIndex the content of dragged item

      if (!isLoggedIn) persistData('tasks', state);
    },
    deleteAllCompleted(state, action) {
      const isLoggedIn = action.payload;
      state.tasks = state.tasks.filter(task => !task.completed);
      if (!isLoggedIn) persistData('tasks', state);
    },
    deleteTask(state, action) {
      const { taskId, isLoggedIn } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      if (!isLoggedIn) persistData('tasks', state);
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setEditedTask(state, action) {
      state.editedTaskId = action.payload;
    },
    setUserTasks(state, action) {
      let tasks = action.payload;
      if (action.payload.length > 0) {
        const completed = tasks.filter(task => task.completed);
        const notCompleted = tasks.filter(task => !task.completed);
        tasks = [...notCompleted, ...completed];
        state.tasks = tasks;
      } else {
        state.tasks = [];
      }
    },
  },
});

export const tasksActions = tasksSlice.actions;

export const fetchTasksData = sendRequest => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const reqConfig = {
      url: `${API_URL}/tasks`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    sendRequest(reqConfig, data => {
      //console.log(data);
      const fetchedTasks = data.documents;
      const tasks = fetchedTasks.map(task => {
        const id = task._id;
        task._id = undefined;
        return { id, ...task };
      });
      dispatch(tasksActions.setUserTasks(tasks));
    });
  };
};

export const postNewTask = (sendRequest, task) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const reqConfig = {
      url: `${API_URL}/tasks`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    };
    sendRequest(reqConfig, data => {
      const task = data.document;
      task.id = task._id;
      task._id = undefined;

      dispatch(tasksActions.addTask({ task, isLoggedIn: !!token }));
    });
  };
};

export const updateStateOfTask = (sendRequest, taskId, complete = true) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    let body;

    if (complete) {
      body = { completed: true, dateCompleted: new Date().toISOString() };
      dispatch(tasksActions.markAsCompleted(taskId));
      setTimeout(() => {
        dispatch(
          tasksActions.removeCompletedFromActive({
            taskId,
            isLoggedIn: !!token,
          })
        );
      }, 500);
    } else {
      body = { completed: false, dateCompleted: null };
      dispatch(tasksActions.cancelCompletion({ taskId, isLoggedIn: !!token }));
    }
    const reqConfig = {
      url: `${API_URL}/tasks/${taskId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    sendRequest(reqConfig);
  };
};
export const updateTaskData = (sendRequest, task) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    let body = { text: task.text, category: task.category };

    const reqConfig = {
      url: `${API_URL}/tasks/${task.id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    sendRequest(reqConfig, () => {
      dispatch(
        tasksActions.updateTask({ updatedTask: task, isLoggedIn: !!token })
      );
    });
  };
};
export const deleteTask = (sendRequest, taskId) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const reqConfig = {
      url: `${API_URL}/tasks/${taskId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    sendRequest(reqConfig, data => {
      dispatch(tasksActions.deleteTask({ taskId, isLoggedIn: !!token }));
    });
  };
};
export const deleteAllCompletedTasks = sendRequest => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const reqConfig = {
      url: `${API_URL}/tasks/removeCompleted`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    sendRequest(reqConfig, data => {
      dispatch(tasksActions.deleteAllCompleted(!!token));
    });
  };
};
export default tasksSlice.reducer;
