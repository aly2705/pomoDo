import classes from './ProfileSettingsList.module.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileSettingsList = () => {
  const token = useSelector(state => state.user.token);
  const isLoggedIn = !!token;

  if (!isLoggedIn)
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
  // else
  //   return (
  //     <div
  //       className={`${classes.profile__settings} ${classes['profile__settings--loggedIn']}`}
  //     >
  //       <NavLink
  //         to="/account-settings"
  //         className={classes['profile__account-link']}
  //       >
  //         <svg>
  //           <use href={`${icons}#icon-user`}></use>
  //         </svg>

  //         <span>Account</span>
  //       </NavLink>
  //       <button className={classes['profile__account-link']}>
  //         <svg>
  //           <use href={`${icons}#icon-exit`}></use>
  //         </svg>

  //         <span>Logout</span>
  //       </button>
  //     </div>
  //   );
};

export default ProfileSettingsList;
