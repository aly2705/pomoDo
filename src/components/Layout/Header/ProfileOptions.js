import { useState } from 'react';
import icons from '../../../img/icons.svg';
import ProfileImg from '../../../img/profile.svg';
import classes from './ProfileOptions.module.scss';
import Settings from '../../UserConfig/Setttings';

const ProfileOptions = () => {
  const [settingsAreShown, setSettingsAreShown] = useState(false);
  const openSettingsModal = () => {
    setSettingsAreShown(true);
  };
  const closeSettingsModal = () => {
    setSettingsAreShown(false);
  };
  return (
    <ul className={classes.profile_options}>
      <li className={classes.option}>
        <button className={classes.option__btn} onClick={openSettingsModal}>
          <svg>
            <use href={`${icons}#icon-cog`}></use>
          </svg>
          <span> Settings </span>
        </button>
        {settingsAreShown && <Settings onClose={closeSettingsModal} />}
      </li>
      <li className={classes.option}>
        <button className={classes.option__btn}>
          <svg>
            <use href={`${icons}#icon-bell`}></use>
          </svg>
          <span className={classes.notifications}>2</span>
          <span> Notifications </span>
        </button>
      </li>
      <li className={classes.profile_label}>
        <img src={ProfileImg} alt="Profile" />
        <span>Guest</span>
      </li>
    </ul>
  );
};

export default ProfileOptions;
