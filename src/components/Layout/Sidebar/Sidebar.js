import classes from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user';

const Sidebar = () => {
  const location = useLocation();
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const isLoggedIn = !!token;
  if (location.pathname === '/login') return;

  const logoutUser = () => {
    dispatch(userActions.removeUserData());
  };

  return (
    <nav className={classes.sidebar}>
      <ul className={classes.sidebar__list}>
        <SidebarItem label="Dashboard" route="/dashboard" icon="#icon-home" />
        <SidebarItem
          label="Pomodoro"
          route="/pomodoro"
          icon="#icon-stopwatch"
        />
        <SidebarItem label="Tasks" route="/tasks" icon="#icon-list-alt" />
        <SidebarItem
          label="Statistics"
          route="/statistics"
          icon="#icon-bar-graph"
        />
        {isLoggedIn && (
          <SidebarItem label="Account" route="/account" icon="#icon-user" />
        )}
        {isLoggedIn && (
          <SidebarItem
            label="Logout"
            route="/login?mode=login"
            icon="#icon-sign-out"
            isPhoneHidden
            onClick={logoutUser}
          />
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
