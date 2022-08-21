import Layout from "./components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import PomodoroPage from "./pages/PomodoroPage";
import DashboardPage from "./pages/DashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import RewardsPage from "./pages/RewardsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/pomodoro" replace />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
