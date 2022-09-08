import Overview from '../components/Dashboard/Overview';
import { useEffect, useState } from 'react';

let isInitial = true;
const DashboardPage = () => {
  const [welcomeIsShown, setWelcomeIsShown] = useState();

  useEffect(() => {
    if (isInitial) {
      setWelcomeIsShown(true);
      isInitial = false;
    }
    return () => {
      setWelcomeIsShown(false);
    };
  }, []);
  return (
    <div className="main-flex-column">
      {welcomeIsShown && <h2 className="greeting">Welcome back!</h2>}
      <Overview />
    </div>
  );
};

export default DashboardPage;
