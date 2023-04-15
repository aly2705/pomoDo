import { createSlice } from '@reduxjs/toolkit';
import { persistData, getData, addHours } from '../helpers/helpers';
import { API_URL } from '../helpers/config';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    calendar: [[], [], [], [], [], [], [], [], [], [], [], []],
  },
  reducers: {
    getCalendarData(state) {
      const storedData = getData('calendar');
      state.calendar = storedData.calendar;
    },
    setUserCalendar(state, action) {
      const calendar = action.payload;
      const month = new Date().getMonth();
      const yesterdayIndex = new Date().getDate() - 2;

      if (!calendar[month][yesterdayIndex]) {
        calendar[month][yesterdayIndex] = null;
      }
      state.calendar = calendar;
    },
    insertActivityData(state, action) {
      const storedActivity = action.payload;

      const date = new Date(storedActivity.date);
      const day = date.getDate();
      const month = date.getMonth();

      state.calendar[month][day - 1] = storedActivity;

      persistData('calendar', state);
    },
    insertYesterdayData(state) {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const day = yesterday.getDate();
      const month = yesterday.getMonth();

      state.calendar[month][day - 1] = undefined;
      persistData('calendar', state);
    },
  },
});

export const calendarActions = calendarSlice.actions;

export const fetchCalendarData = sendRequest => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const reqConfig = {
      url: `${API_URL}/reports/calendar`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    sendRequest(reqConfig, data => {
      dispatch(calendarActions.setUserCalendar(data.data));
    });
  };
};

export const sendNewReportAndUpdateCalendar = (sendRequest, report) => {
  return async (dispatch, getState) => {
    const state = getState();
    // Report won't be added to database if there is no activity
    if (
      !(
        report.numberOfCompletedPomodoros ||
        report.totalActiveHours ||
        report.numberOfCompletedTasks
      )
    )
      return;

    const APIreport = {
      date: report.date,
      numberOfCompletedPomodoros: report.numberOfCompletedPomodoros,
      numberOfCompletedTasks: report.numberOfCompletedTasks,
      totalActiveHours: addHours(report.hours),
    };

    const reqConfig = {
      url: `${API_URL}/reports`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.user.token}`,
      },
      body: JSON.stringify(APIreport),
    };

    sendRequest(reqConfig, data => {
      reqConfig.url = `${API_URL}/reports/calendar`;
      reqConfig.method = 'GET';
      sendRequest(reqConfig, newCalendar => {
        dispatch(calendarActions.setUserCalendar(newCalendar.data));
      });
    });
  };
};
export default calendarSlice.reducer;
