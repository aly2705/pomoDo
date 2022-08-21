import classes from "./Sidebar.module.scss";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <nav className={classes.sidebar}>
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
