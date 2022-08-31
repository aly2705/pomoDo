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
import { timerActions } from './store/timer';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';

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
      // console.log(secondsOutsidePomodoro);
      dispatch(timerActions.subtractOutsideSeconds(secondsOutsidePomodoro));
      secondsOutsidePomodoro = 0;
    }
  }, [match, timerIsActive, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/pomodoro" replace />} />
        <Route path="/pomodoro/*" element={<PomodoroPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/statistics/*" element={<StatisticsPage />} />
        <Route path="/rewards/*" element={<RewardsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
