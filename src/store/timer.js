import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    countdown: { minutes: 25, seconds: 0 },
    isActive: false,
    type: 'pomodoro',
    totalSeconds: 25 * 60,
  },
  reducers: {
    toggleIsActive(state) {
      state.isActive = !state.isActive;
    },
    countdown(state, action) {
      if (state.countdown.minutes === 0 && state.countdown.seconds === 0) {
        clearInterval(action.payload);
        state.countdown.minutes = 0;
        state.countdown.seconds = 0;
      } else if (state.countdown.seconds === 0) {
        state.countdown.minutes = state.countdown.minutes - 1;
        state.countdown.seconds = 59;
      } else state.countdown.seconds = state.countdown.seconds - 1;
    },
    changeTimer(state, action) {
      const timerType = action.payload;
      state.isActive = false;
      switch (timerType) {
        case 'pomodoro':
          state.countdown = { minutes: 25, seconds: 0 };
          state.type = 'pomodoro';
          state.totalSeconds = 25 * 60;
          break;
        case 'shortBR':
          state.countdown = { minutes: 5, seconds: 0 };
          state.type = 'shortBR';
          state.totalSeconds = 5 * 60;
          break;
        case 'longBR':
          state.countdown = { minutes: 10, seconds: 0 };
          state.type = 'longBR';
          state.totalSeconds = 10 * 60;
          break;
        default:
          state.countdown = { minutes: 25, seconds: 0 };
          state.type = 'pomodoro';
          state.totalSeconds = 25 * 60;
          break;
      }
    },
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
