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
import RewardsPage from './pages/RewardsPage';
import TasksPage from './pages/TasksPage';
import { timerActions } from './store/timer';
import { tasksActions } from './store/tasks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import useUnload from './hooks/useUnload';

let secondsOutsidePomodoro = 0;

function App() {
  const dispatch = useDispatch();
  const timerIsActive = useSelector(state => state.timer.isActive);
  const location = useLocation();

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
  }, [dispatch]);

  useEffect(() => {
    if (!timerIsActive) return;
    if (!match) {
      const interval = setInterval(() => {
        secondsOutsidePomodoro++;
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    if (match) {
      dispatch(timerActions.subtractOutsideSeconds(secondsOutsidePomodoro));
      secondsOutsidePomodoro = 0;
    }
  }, [match, timerIsActive, dispatch]);

  useUnload(event => {
    event.preventDefault();
    dispatch(timerActions.subtractOutsideSeconds(secondsOutsidePomodoro));
    secondsOutsidePomodoro = 0;
  });

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/pomodoro" replace />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
