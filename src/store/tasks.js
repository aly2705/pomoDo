import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      {
        id: 'task1',
        completed: true,
        category: 'Study',
        text: 'Finish at least one chapter in the course book',
      },
      {
        id: 'task2',
        completed: false,
        category: 'Exercise',
        text: 'Workout 3 times this week',
      },
      {
        id: 'task3',
        completed: false,
        category: 'Wellness',
        text: 'Dine out with old friends',
      },
      {
        id: 'task4',
        completed: false,
        category: 'Chores',
        text: 'Clean the bathroom thoroughly',
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
      persistData('tasks', state);
    },
    getTasksData(state) {
      const storedData = getData('tasks');
      //   console.log()
      state.tasks = storedData.tasks;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
