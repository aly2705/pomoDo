import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    countdown: { minutes: 25, seconds: 0 },
    isActive: false,
    type: undefined, //avoid setting active class on pomodoro when init
    totalSeconds: 25 * 60,
    config: {
      pomodoro: 25,
      short: 5,
      long: 10,
    },
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
          state.countdown = { minutes: state.config.pomodoro, seconds: 0 };
          state.type = 'pomodoro';
          state.totalSeconds = state.config.pomodoro * 60;
          break;
        case 'shortBR':
          state.countdown = { minutes: state.config.short, seconds: 0 };
          state.type = 'shortBR';
          state.totalSeconds = state.config.short * 60;
          break;
        case 'longBR':
          state.countdown = { minutes: state.config.long, seconds: 0 };
          state.type = 'longBR';
          state.totalSeconds = state.config.long * 60;
          break;
        default:
          state.countdown = { minutes: state.config.pomodoro, seconds: 0 };
          state.type = 'pomodoro';
          state.totalSeconds = state.config.pomodoro * 60;
          break;
      }
    },
    updateConfig(state, action) {
      state.config = action.payload;
      // const newShort = action.payload.short;
    },
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
