import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';
import { dateIsToday } from '../helpers/helpers';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    isEditing: false,
    tasks: [
      {
        id: 'task1',
        completed: true,
        category: 'Study',
        text: 'Finish at least one chapter in the course book',
        dateCompleted: new Date(2022, 4, 27).toISOString(),
      },
      {
        id: 'task2',
        completed: false,
        category: 'Exercise',
        text: 'Workout 3 times this week',
        dateCompleted: null,
      },
      {
        id: 'task3',
        completed: false,
        category: 'Wellness',
        text: 'Dine out with old friends',
        dateCompleted: null,
      },
      {
        id: 'task4',
        completed: false,
        category: 'Chores',
        text: 'Clean the bathroom thoroughly',
        dateCompleted: null,
      },
    ],
  },
  reducers: {
    addTask(state, action) {
      const task = action.payload;
      state.tasks.push(task);
      persistData('tasks', state);
    },
    markAsCompleted(state, action) {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      state.tasks.at(taskIndex).completed = true;
      state.tasks.at(taskIndex).dateCompleted = new Date().toISOString();
      persistData('tasks', state);
    },
    cancelCompletion(state, action) {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      const task = state.tasks.at(taskIndex);
      if (dateIsToday(task.dateCompleted)) {
        task.completed = false;
        task.dateCompleted = null;
      } else return;
      persistData('tasks', state);
    },
    getTasksData(state) {
      const storedData = getData('tasks');
      state.tasks = storedData.tasks;
    },
    replaceListOnDrop(state, action) {
      const { dragItemIndex, dragOverIndex } = action.payload;
      const dragItemContent = state.tasks[dragItemIndex]; // saves content of draggedItem
      state.tasks.splice(dragItemIndex, 1); //cuts from tasks the dragged element
      state.tasks.splice(dragOverIndex, 0, dragItemContent); //inserts at dragOverIndex the content of dragged item

      persistData('tasks', state);
    },
    deleteAllCompleted(state) {
      state.tasks = state.tasks.filter(task => !task.completed);
      persistData('tasks', state);
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      persistData('tasks', state);
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
