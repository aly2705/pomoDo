import { createSlice } from '@reduxjs/toolkit';
import { persistData, getData } from '../helpers/helpers';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    calendar: [[], [], [], [], [], [], [], [], [], [], [], []],
  },
  reducers: {
    insertActivityData(state, action) {
      const storedActivity = action.payload;

      const date = new Date(storedActivity.date);
      const day = date.getDate();
      const month = date.getMonth();

      state.calendar[month][day - 1] = storedActivity;

      persistData('calendar', state);
    },
    getCalendarData(state) {
      const storedData = getData('calendar');
      state.calendar = storedData.calendar;
    },
    changeDayInCalendar(state, action) {
      const { date, month } = action.payload;
      state.calendar[month][date] = null;
      persistData('calendar', state);
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
