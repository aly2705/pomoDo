import React, { useEffect, useState } from 'react';
import icons from '../../../assets/icons.svg';
import ProfileImg from '../../../assets/profile.svg';
import classes from './ProfileOptions.module.scss';
import Settings from '../../UserConfig/Setttings';
import ProfileSettingsList from './ProfileSettingsList';
import TransparentOverlay from '../../UI/TransparentOverlay';
import { NavLink, useLocation } from 'react-router-dom';

const ProfileOptions = () => {
  const [settingsAreShown, setSettingsAreShown] = useState(false);
  const [profileSettingsAreShown, setProfileSettingsAreShown] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

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
          disabled={isLoginPage}
          className={classes.option__btn}
          onClick={toggleProfileList}
        >
          <img src={ProfileImg} alt="Profile" />
          <span>Guest</span>
        </button>
        {profileSettingsAreShown && (
          <TransparentOverlay onClick={toggleProfileList} />
        )}
        {profileSettingsAreShown && <ProfileSettingsList />}
      </li>
    </ul>
  );
};

export default React.memo(ProfileOptions);
