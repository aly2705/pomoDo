import Layout from './components/Layout/Layout';
import {
  Routes,
  Route,
  Navigate,
  matchPath,
  useLocation,
} from 'react-router-dom';
import PomodoroPage from './pages/PomodoroPage';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import TasksPage from './pages/TasksPage';
import { timerActions } from './store/timer';
import { tasksActions } from './store/tasks';
import { activityActions } from './store/activity';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import useUnload from './hooks/useUnload';
import { dateIsYesterday, dateIsToday, getData } from './helpers/helpers';
import { calendarActions } from './store/calendar';
import audioFile from './assets/completed.mp3';

let secondsOutsidePomodoro = 0;
let audioPlayedOutside = false;
const audio = new Audio(audioFile);

function App() {
  const dispatch = useDispatch();
  const timerIsActive = useSelector(state => state.timer.isActive);
  const location = useLocation();
  const pomodoroWasCompleted = useSelector(state => state.timer.wasCompleted);
  const pomodoroMinutes = useSelector(state => state.timer.config.pomodoro);
  const countdown = useSelector(state => state.timer.countdown);

  const match = matchPath(
    {
      path: '/pomodoro',
      exact: true,
      strict: false,
    },
    location.pathname
  );

  useEffect(() => {
    if (localStorage.getItem('timer')) {
      dispatch(timerActions.getTimerData());
    }
    if (localStorage.getItem('tasks')) {
      dispatch(tasksActions.getTasksData());
    }
    if (localStorage.getItem('calendar')) {
      dispatch(calendarActions.getCalendarData());
    }
    if (localStorage.getItem('activity')) {
      const storedActivity = getData('activity');
      if (dateIsToday(storedActivity.date)) {
        dispatch(activityActions.getActivityData());
      } else {
        dispatch(calendarActions.insertActivityData(storedActivity));
        dispatch(timerActions.changeTimer('pomodoro'));
        if (!dateIsYesterday(storedActivity.date))
          // insert null data for yesterday so the statistics will update with the correct data
          dispatch(calendarActions.insertYesterdayData());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (pomodoroWasCompleted) {
      dispatch(activityActions.addCompletedPomodoro());
      dispatch(
        activityActions.saveMinutesWhenPomodoroPaused({
          totalSeconds: pomodoroMinutes * 60,
          countdown: { minutes: 0, seconds: 0 },
          reinitMinutesPassed: true,
        })
      );
    }
  }, [pomodoroWasCompleted, dispatch, pomodoroMinutes]);

  useEffect(() => {
    const remainingSeconds = countdown.minutes * 60 + countdown.seconds;
    if (remainingSeconds > 0) audioPlayedOutside = false;
    if (remainingSeconds === 0 && !audioPlayedOutside) audio.play();
  }, [countdown]);

  useEffect(() => {
    if (!timerIsActive) return;
    if (!match) {
      const remainingSeconds = countdown.minutes * 60 + countdown.seconds;
      const interval = setInterval(() => {
        secondsOutsidePomodoro++;
        if (secondsOutsidePomodoro > remainingSeconds) {
          audio.play();
          audioPlayedOutside = true;
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    if (match) {
      dispatch(timerActions.subtractOutsideSeconds(secondsOutsidePomodoro));
      secondsOutsidePomodoro = 0;
    }
  }, [match, timerIsActive, dispatch, countdown]);

  useUnload(event => {
    event.preventDefault();
    dispatch(timerActions.subtractOutsideSeconds(secondsOutsidePomodoro));
    secondsOutsidePomodoro = 0;
  });

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

// localStorage.setItem(
//   'activity',
//   JSON.stringify({
//     activeMinutesAlreadyAdded: 0,
//     date: '2022-09-27T17:33:59.338Z',
//     hours: [
//       { hour: 5, activeMinutes: 0 },
//       { hour: 6, activeMinutes: 0 },
//       { hour: 7, activeMinutes: 0 },
//       { hour: 8, activeMinutes: 0 },
//       { hour: 9, activeMinutes: 0 },
//       { hour: 10, activeMinutes: 0 },
//       { hour: 11, activeMinutes: 0 },
//       { hour: 12, activeMinutes: 60 },
//       { hour: 13, activeMinutes: 60 },
//       { hour: 14, activeMinutes: 60 },
//       { hour: 15, activeMinutes: 60 },
//       { hour: 16, activeMinutes: 60 },
//       { hour: 17, activeMinutes: 0 },
//       { hour: 18, activeMinutes: 30 },
//       { hour: 19, activeMinutes: 60 },
//       { hour: 20, activeMinutes: 30 },
//       { hour: 21, activeMinutes: 60 },
//       { hour: 22, activeMinutes: 0 },
//       { hour: 23, activeMinutes: 0 },
//     ],
//     numberOfCompletedPomodoros: 1,
//     numberOfCompletedTasks: 5,
//   })
// );

//DUMMY DATA FOR CALENDAR
// localStorage.setItem(
//   'calendar',
//   JSON.stringify({
//     calendar: [
//       [],
//       [],
//       [],
//       [],
//       [],
//       [],
//       [],
//       [],
//       [
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,
//         null,

//         {
//           activeMinutesAlreadyAdded: 0,
//           date: '2022-09-27T17:33:59.338Z',
//           hours: [
//             { hour: 5, activeMinutes: 0 },
//             { hour: 6, activeMinutes: 0 },
//             { hour: 7, activeMinutes: 0 },
//             { hour: 8, activeMinutes: 0 },
//             { hour: 9, activeMinutes: 0 },
//             { hour: 10, activeMinutes: 0 },
//             { hour: 11, activeMinutes: 0 },
//             { hour: 12, activeMinutes: 60 },
//             { hour: 13, activeMinutes: 60 },
//             { hour: 14, activeMinutes: 60 },
//             { hour: 15, activeMinutes: 60 },
//             { hour: 16, activeMinutes: 60 },
//             { hour: 17, activeMinutes: 0 },
//             { hour: 18, activeMinutes: 30 },
//             { hour: 19, activeMinutes: 60 },
//             { hour: 20, activeMinutes: 30 },
//             { hour: 21, activeMinutes: 60 },
//             { hour: 22, activeMinutes: 0 },
//             { hour: 23, activeMinutes: 0 },
//           ],
//           numberOfCompletedPomodoros: 1,
//           numberOfCompletedTasks: 5,
//         },
//         null,
//         {
//           activeMinutesAlreadyAdded: 0,
//           date: '2022-09-29T17:33:59.338Z',
//           hours: [
//             { hour: 5, activeMinutes: 0 },
//             { hour: 6, activeMinutes: 0 },
//             { hour: 7, activeMinutes: 0 },
//             { hour: 8, activeMinutes: 0 },
//             { hour: 9, activeMinutes: 0 },
//             { hour: 10, activeMinutes: 0 },
//             { hour: 11, activeMinutes: 0 },
//             { hour: 12, activeMinutes: 60 },
//             { hour: 13, activeMinutes: 0 },
//             { hour: 14, activeMinutes: 0 },
//             { hour: 15, activeMinutes: 0 },
//             { hour: 16, activeMinutes: 0 },
//             { hour: 17, activeMinutes: 0 },
//             { hour: 18, activeMinutes: 0 },
//             { hour: 19, activeMinutes: 0 },
//             { hour: 20, activeMinutes: 30 },
//             { hour: 21, activeMinutes: 60 },
//             { hour: 22, activeMinutes: 0 },
//             { hour: 23, activeMinutes: 0 },
//           ],
//           numberOfCompletedPomodoros: 1,
//           numberOfCompletedTasks: 10,
//         },
//         {
//           activeMinutesAlreadyAdded: 0,
//           date: '2022-09-30T17:33:59.338Z',
//           hours: [
//             { hour: 5, activeMinutes: 0 },
//             { hour: 6, activeMinutes: 0 },
//             { hour: 7, activeMinutes: 0 },
//             { hour: 8, activeMinutes: 30 },
//             { hour: 9, activeMinutes: 0 },
//             { hour: 10, activeMinutes: 0 },
//             { hour: 11, activeMinutes: 0 },
//             { hour: 12, activeMinutes: 60 },
//             { hour: 13, activeMinutes: 0 },
//             { hour: 14, activeMinutes: 50 },
//             { hour: 15, activeMinutes: 0 },
//             { hour: 16, activeMinutes: 60 },
//             { hour: 17, activeMinutes: 0 },
//             { hour: 18, activeMinutes: 30 },
//             { hour: 19, activeMinutes: 60 },
//             { hour: 20, activeMinutes: 30 },
//             { hour: 21, activeMinutes: 60 },
//             { hour: 22, activeMinutes: 0 },
//             { hour: 23, activeMinutes: 0 },
//           ],
//           numberOfCompletedPomodoros: 1,
//           numberOfCompletedTasks: 15,
//         },
//       ],
//       [
//         {
//           activeMinutesAlreadyAdded: 0,
//           date: '2022-10-01T17:33:59.338Z',
//           hours: [
//             { hour: 5, activeMinutes: 0 },
//             { hour: 6, activeMinutes: 0 },
//             { hour: 7, activeMinutes: 0 },
//             { hour: 8, activeMinutes: 0 },
//             { hour: 9, activeMinutes: 0 },
//             { hour: 10, activeMinutes: 0 },
//             { hour: 11, activeMinutes: 0 },
//             { hour: 12, activeMinutes: 60 },
//             { hour: 13, activeMinutes: 0 },
//             { hour: 14, activeMinutes: 0 },
//             { hour: 15, activeMinutes: 0 },
//             { hour: 16, activeMinutes: 0 },
//             { hour: 17, activeMinutes: 0 },
//             { hour: 18, activeMinutes: 30 },
//             { hour: 19, activeMinutes: 60 },
//             { hour: 20, activeMinutes: 30 },
//             { hour: 21, activeMinutes: 60 },
//             { hour: 22, activeMinutes: 0 },
//             { hour: 23, activeMinutes: 0 },
//           ],
//           numberOfCompletedPomodoros: 1,
//           numberOfCompletedTasks: 3,
//         },
//       ],
//       [],
//       [],
//     ],
//   })
// );
