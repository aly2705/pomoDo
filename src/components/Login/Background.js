import backgroundSVG from '../../assets/login-backgr/background3.svg';
import classes from './Background.module.scss';

const Background = () => {
  return (
    <img
      src={backgroundSVG}
      alt="Login Background"
      className={classes.background}
    />
  );
};

export default Background;
