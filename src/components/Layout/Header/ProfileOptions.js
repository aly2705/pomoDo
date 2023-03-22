import React, { useEffect, useState } from 'react';
import icons from '../../../assets/icons.svg';
import ProfileImg from '../../../assets/profile.svg';
import classes from './ProfileOptions.module.scss';
import Settings from '../../UserConfig/Setttings';
import ProfileSettingsList from './ProfileSettingsList';
import TransparentOverlay from '../../UI/TransparentOverlay';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user';

const ProfileOptions = () => {
  const [settingsAreShown, setSettingsAreShown] = useState(false);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [profileSettingsAreShown, setProfileSettingsAreShown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const isLoggedIn = !!user;

  const logoutUser = () => {
    dispatch(userActions.removeUserData());
    navigate('/login?mode=login');
  };

  useEffect(() => {
    if (isLoginPage) setProfileSettingsAreShown(false);
  }, [isLoginPage]);
  const openSettingsModal = () => {
    setSettingsAreShown(true);
  };
  const closeSettingsModal = () => {
    setSettingsAreShown(false);
  };
  const toggleProfileList = () => {
    setProfileSettingsAreShown(prev => !prev);
  };
  return (
    <ul className={classes.profile_options}>
      {!isLoginPage && (
        <li className={classes.option}>
          <button className={classes.option__btn} onClick={openSettingsModal}>
            <svg>
              <use href={`${icons}#icon-cog`}></use>
            </svg>
            <span> Settings </span>
          </button>
          {settingsAreShown && <Settings onClose={closeSettingsModal} />}
        </li>
      )}
      {isLoginPage && (
        <li className={classes.option}>
          <NavLink to="/dashboard" className={classes.option__btn}>
            <svg>
              <use href={`${icons}#icon-home`}></use>
            </svg>
            <span> Dashboard </span>
          </NavLink>
        </li>
      )}
      {/* <li className={classes.option}>
        <button className={classes.option__btn}>
          <svg>
            <use href={`${icons}#icon-bell`}></use>
          </svg>
          <span className={classes.notifications}>2</span>
          <span> Notifications </span>
        </button>
      </li> // postponed notifications system */}
      <li className={`${classes.option} ${classes.profile_label}`}>
        <button
          disabled={isLoginPage || isLoggedIn}
          className={`${classes.option__btn} ${
            isLoginPage || isLoggedIn ? classes['option__btn--inactive'] : ''
          }`}
          onClick={toggleProfileList}
        >
          <img src={ProfileImg} alt="Profile" />
          <span>{isLoggedIn ? user.name.split(' ').at(0) : 'Guest'}</span>
        </button>
        {profileSettingsAreShown && (
          <TransparentOverlay onClick={toggleProfileList} />
        )}
        {profileSettingsAreShown && <ProfileSettingsList />}
      </li>
      {isLoggedIn && (
        <li className={`${classes.option} ${classes.logout_btn}`}>
          <button className="btn" onClick={logoutUser}>
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default React.memo(ProfileOptions);
