import icons from "../../../img/icons.svg";
import ProfileImg from "../../../img/profile.svg";
import classes from "./ProfileOptions.module.scss";

const ProfileOptions = () => {
  return (
    <ul className={classes.profile_options}>
      <li className={classes.option}>
        <a href="/" className={classes.option__link}>
          <svg>
            <use href={`${icons}#icon-cog`}></use>
          </svg>
          <span> Settings </span>
        </a>
      </li>
      <li className={classes.option}>
        <a href="/" className={classes.option__link}>
          <svg>
            <use href={`${icons}#icon-bell`}></use>
          </svg>
          <span className={classes.notifications}>2</span>
          <span> Notifications </span>
        </a>
      </li>
      <li className={classes.profile_label}>
        <img src={ProfileImg} alt="Profile" />
        <span>Guest</span>
      </li>
    </ul>
  );
};

export default ProfileOptions;
