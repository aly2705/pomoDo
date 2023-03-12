import classes from './ProfileSettingsList.module.scss';
import { NavLink } from 'react-router-dom';

const ProfileSettingsList = () => {
  return (
    <div
      className={`${classes.profile__settings} ${classes['profile__settings--guest']}`}
    >
      <h3>Log into your account!</h3>
      <div className={classes['profile__auth-btns']}>
        <NavLink
          to="/login?mode=login"
          className={classes['profile__auth-btn']}
        >
          Log in
        </NavLink>
        <NavLink
          to="/login?mode=signup"
          className={`${classes['profile__auth-btn']} ${classes['profile__auth-btn--secondary']}`}
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSettingsList;
