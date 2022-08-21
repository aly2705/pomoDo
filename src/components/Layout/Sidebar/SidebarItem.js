import classes from "./SidebarItem.module.scss";
import icons from "../../../img/icons.svg";
import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = (props) => {
  const location = useLocation();
  const isActive = location.pathname.includes(props.route);

  const CSSclasses = isActive
    ? `${classes.sidebar__item} ${classes["sidebar__item--active"]}`
    : classes.sidebar__item;

  return (
    <li className={CSSclasses}>
      <NavLink to={props.route} className={classes.sidebar__link}>
        <svg>
          <use href={`${icons}${props.icon}`}></use>
        </svg>
        {props.label}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
