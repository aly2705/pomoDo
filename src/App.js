import Layout from './components/Layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import PomodoroPage from './pages/PomodoroPage';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import TasksPage from './pages/TasksPage';
import AccountPage from './pages/AccountPage';
import { useSelector } from 'react-redux/es/exports';
import { useState } from 'react';
import usePageVisibilty from './hooks/usePageVisibility';
import LoginPage from './pages/LoginPage';
import useTimerVisibility from './hooks/useTimerVisibility';
import useCountOutsidePomodoro from './hooks/useCountOutsidePomodoro';
import useSavePomodoroMinutes from './hooks/useSavePomodoroMinutes';
import useInit from './hooks/useInit';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorAlert from './components/UI/ErrorAlert';

let secondsOutsidePomodoro = 0;

function App() {
  const timerIsActive = useSelector(state => state.timer.isActive);
  const pomodoroWasCompleted = useSelector(state => state.timer.wasCompleted);

  const countdown = useSelector(state => state.timer.countdown);
  const [pageVisibility, setPageVisibility] = useState(
    document.visibilityState
  );

  const { isLoading, error } = useInit();
  const isLoggedIn = !!useSelector(state => state.user.token);

  useSavePomodoroMinutes(pomodoroWasCompleted);
  useCountOutsidePomodoro(timerIsActive, countdown, secondsOutsidePomodoro);
  useTimerVisibility(timerIsActive, pageVisibility, secondsOutsidePomodoro);

  usePageVisibilty(() => {
    setPageVisibility(document.visibilityState);
  });

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/login" element={<LoginPage />} />
        {isLoggedIn && <Route path="/account" element={<AccountPage />} />}
      </Routes>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
    </Layout>
  );
}

export default App;
