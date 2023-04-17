import { createSlice } from '@reduxjs/toolkit';
import { dateIsToday, getData, persistData } from '../helpers/helpers';
import { API_URL } from '../helpers/config';
import { timerActions } from './timer';
import { sendNewReportAndUpdateCalendar } from './calendar';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    date: new Date().toDateString(),
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
    numberOfCompletedTasks: 0,
    activeMinutesAlreadyAdded: 0,
  },
  reducers: {
    getActivityData(state) {
      const storedData = getData('activity');
      state.hours = storedData.hours;
      state.numberOfCompletedPomodoros = storedData.numberOfCompletedPomodoros;
      state.numberOfCompletedTasks = storedData.numberOfCompletedTasks;
      state.activeMinutesAlreadyAdded = storedData.activeMinutesAlreadyAdded;
    },

    initializeActivity(state) {
      state.date = new Date().toDateString();
      state.hours = [
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
      ];
      state.numberOfCompletedPomodoros = 0;
      state.numberOfCompletedTasks = 0;
      state.activeMinutesAlreadyAdded = 0;
    },

    addActiveTime(state, action) {
      let {
        startingHour,
        hoursOfActivity,
        remainingMinutes,
        safeToSave,
        isLoggedIn,
      } = action.payload;
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
      if (!state.hours[index].activeMinutes || safeToSave) {
        if (index === indexStarting || remainingMinutes > 0)
          state.hours[index].activeMinutes = remainingMinutes;
      } else
        throw new Error(
          'You have already logged time for an hour in your interval. Do you want to override it?'
        );
      if (!isLoggedIn) persistData('activity', state);
    },

    saveMinutesWhenPomodoroPaused(state, action) {
      const { totalSeconds, countdown, reinitMinutesPassed, isLoggedIn } =
        action.payload;
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();

      if (currentHour > 4 && currentHour < 24) {
        const indexOfHour = state.hours.findIndex(
          hour => hour.hour === currentHour
        );
        const passedMinutes =
          Math.trunc(
            (totalSeconds - (countdown.minutes * 60 + countdown.seconds)) / 60
          ) - state.activeMinutesAlreadyAdded;

        //console.log(currentMinutes, passedMinutes);
        if (passedMinutes > currentMinutes) {
          //Update current hour
          const minutesToAddToCurrentHour = currentMinutes;
          state.hours[indexOfHour].activeMinutes += minutesToAddToCurrentHour;

          //Update passed hour (or hours if minutes are more than 60)
          let minutesToAddToPassedHour = passedMinutes - currentMinutes;
          let indexOfHourToAddTo = indexOfHour - 1;
          while (minutesToAddToPassedHour > 60) {
            state.hours[indexOfHourToAddTo].activeMinutes += 60;
            minutesToAddToPassedHour -= 60;
            indexOfHourToAddTo--;
          }
          state.hours[indexOfHourToAddTo].activeMinutes +=
            minutesToAddToPassedHour;
        } else {
          const newActiveMinutes =
            state.hours[indexOfHour].activeMinutes + passedMinutes;
          state.hours[indexOfHour].activeMinutes = newActiveMinutes;
        }
        if (!reinitMinutesPassed)
          state.activeMinutesAlreadyAdded += passedMinutes;
        else state.activeMinutesAlreadyAdded = 0;
      }
      if (!isLoggedIn) persistData('activity', state);
    },

    addCompletedPomodoro(state, action) {
      const isLoggedIn = action.payload;
      state.numberOfCompletedPomodoros++;
      if (!isLoggedIn) persistData('activity', state);
    },

    updateNumberOfCompletedTasks(state, action) {
      const { operation, isLoggedIn } = action.payload;
      if (operation === 'add') state.numberOfCompletedTasks++;
      if (operation === 'subtract') state.numberOfCompletedTasks--;
      if (!isLoggedIn) persistData('activity', state);
    },

    addUserOverview(state, action) {
      const overview = action.payload;
      state.date = new Date(overview.date).toDateString();
      state.hours = overview.hours;
      state.numberOfCompletedPomodoros = overview.numberOfCompletedPomodoros;
      state.numberOfCompletedTasks = overview.numberOfCompletedTasks;
      state.activeMinutesAlreadyAdded = overview.activeMinutesAlreadyAdded;
    },
  },
});

export const activityActions = activitySlice.actions;

// THUNK ACTION CREATOR
export const updateActivityData = (sendRequest, overviewId = null) => {
  return async (dispatch, getState) => {
    dispatch(activityActions.initializeActivity());
    const state = getState();
    const reqConfig = {
      url: `${API_URL}/overviews/${overviewId || ''}`,
      method: overviewId ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.user.token}`,
      },
      body: JSON.stringify(state.activity),
    };

    sendRequest(reqConfig);
  };
};

export const fetchAndInitActivity = sendRequest => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const reqConfig = {
      url: `${API_URL}/overviews/myOverview`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    sendRequest(reqConfig, data => {
      if (!data.overview) {
        // CREATE DATA IN STORE AND IN DATABASE
        try {
          dispatch(updateActivityData(sendRequest));
        } catch (err) {
          console.log(err);
        }
      } else if (dateIsToday(data.overview.date)) {
        console.log(data.overview);

        console.log('Date is today');

        // Date is today => add in store
        dispatch(activityActions.addUserOverview(data.overview));
      } else {
        // Fetched data not today
        console.log('Fetched data not today');
        // Re-init timer
        dispatch(timerActions.changeTimer('pomodoro'));

        try {
          // Create report and insert in calendar if report has active time
          dispatch(sendNewReportAndUpdateCalendar(sendRequest, data.overview));
          // Reinitialize activity in store & update in db
          dispatch(updateActivityData(sendRequest, data.overview._id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
};

export const updateOverviewHours = (
  sendRequest,
  dataToBeComputed,
  setConfirmationData = undefined
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const onHourManualLog = !!setConfirmationData;

    // Used to check if we update on pomodoro completion or on manual log
    if (onHourManualLog) {
      try {
        dispatch(activityActions.addActiveTime(dataToBeComputed));
      } catch (err) {
        setConfirmationData({
          warning: err.message,
          savedData: { ...dataToBeComputed, safeToSave: true },
        });
        return;
      }
    } else {
      dispatch(activityActions.saveMinutesWhenPomodoroPaused(dataToBeComputed));
    }
    const { hours, activeMinutesAlreadyAdded } = getState().activity;
    const reqConfig = {
      url: `${API_URL}/overviews/myOverview`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hours, activeMinutesAlreadyAdded }),
    };
    sendRequest(reqConfig);
  };
};

export const updateOverviewTasksAndPomodoros = (
  sendRequest,
  operation = null
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    if (!operation) {
      dispatch(activityActions.addCompletedPomodoro(!!token));
    } else {
      dispatch(
        activityActions.updateNumberOfCompletedTasks({
          isLoggedIn: !!token,
          operation,
        })
      );
    }
    const state = getState().activity;
    const reqConfig = {
      url: `${API_URL}/overviews/myOverview`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        numberOfCompletedPomodoros: state.numberOfCompletedPomodoros,
        numberOfCompletedTasks: state.numberOfCompletedTasks,
      }),
    };

    sendRequest(reqConfig);
  };
};

export default activitySlice.reducer;
