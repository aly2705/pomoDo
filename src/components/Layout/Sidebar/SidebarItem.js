import classes from './SidebarItem.module.scss';
import icons from '../../../img/icons.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { mobileMenuActions } from '../../../store/mobile-menu';
import { useDispatch } from 'react-redux';

const SidebarItem = props => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isActive = location.pathname.includes(props.route);

  const CSSclasses = isActive
    ? `${classes.sidebar__item} ${classes['sidebar__item--active']}`
    : classes.sidebar__item;

  const hideSidebarHandler = () => {
    if (window.innerWidth < 600) dispatch(mobileMenuActions.toggleMenu());
  };

  return (
    <li className={CSSclasses}>
      <NavLink
        to={props.route}
        className={classes.sidebar__link}
        onClick={hideSidebarHandler}
      >
        <svg>
          <use href={`${icons}${props.icon}`}></use>
        </svg>
        <span>{props.label}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
