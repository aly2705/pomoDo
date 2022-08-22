import classes from './Sidebar.module.scss';

import SidebarItem from './SidebarItem';

const Sidebar = props => {
  const CSSclasses = props.opened
    ? `${classes.sidebar} ${classes.shown}`
    : classes.sidebar;
  return (
    <nav className={CSSclasses}>
      <ul className={classes.sidebar__list}>
        <SidebarItem
          label="Pomodoro"
          route="/pomodoro"
          icon="#icon-stopwatch"
          active={true}
        />
        <SidebarItem label="Dashboard" route="/dashboard" icon="#icon-home" />
        <SidebarItem
          label="Statistics"
          route="/statistics"
          icon="#icon-bar-graph"
        />
        <SidebarItem label="Rewards" route="/rewards" icon="#icon-trophy" />
      </ul>
    </nav>
  );
};

export default Sidebar;
