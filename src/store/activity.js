import { createSlice } from '@reduxjs/toolkit';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    hours: [
      { hour: 5, activeMinutes: 0 },
      { hour: 6, activeMinutes: 0 },
      { hour: 7, activeMinutes: 0 },
      { hour: 8, activeMinutes: 0 },
      { hour: 9, activeMinutes: 0 },
      { hour: 10, activeMinutes: 0 },
      { hour: 11, activeMinutes: 0 },
      { hour: 12, activeMinutes: 0 },
      { hour: 13, activeMinutes: 0 },
      { hour: 14, activeMinutes: 0 },
      { hour: 15, activeMinutes: 0 },
      { hour: 16, activeMinutes: 0 },
      { hour: 17, activeMinutes: 0 },
      { hour: 18, activeMinutes: 0 },
      { hour: 19, activeMinutes: 0 },
      { hour: 20, activeMinutes: 0 },
      { hour: 21, activeMinutes: 0 },
      { hour: 22, activeMinutes: 0 },
      { hour: 23, activeMinutes: 0 },
    ],
    numberOfCompletedPomodoros: 0,
  },
  reducers: {
    addActiveTime(state, action) {
      let { startingHour, hoursOfActivity, remainingMinutes, safeToSave } =
        action.payload;
      const indexStarting = state.hours.findIndex(
        hour => hour.hour === startingHour
      );

      let index = indexStarting;

      // If we computed hours we complete them in state
      // and increment the index to update minutes correctly when loop ends
      while (hoursOfActivity) {
        if (!state.hours[index].activeMinutes || safeToSave)
          state.hours[index].activeMinutes = 60;
        else
          throw new Error(
            'You have already logged time for an hour in your interval. Do you want to override it?'
          );
        hoursOfActivity--;
        index++;
      }

      // loop entered => not updating the starting hour, but the one that the loop ended with
      // loop not entered => we update the starting hour
      if (!state.hours[index].activeMinutes || safeToSave)
        state.hours[index].activeMinutes = remainingMinutes;
      else
        throw new Error(
          'You have already logged time for an hour in your interval. Do you want to override it?'
        );
    },
    addCompletedPomodoro(state) {
      state.numberOfCompletedPomodoros++;
      console.log('added pomodoro');
    },
  },
});

export const activityActions = activitySlice.actions;
export default activitySlice.reducer;
