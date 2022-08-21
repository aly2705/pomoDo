import LogoImg from "../../../img/logo.png";
import classes from "./Logo.module.scss";

const Logo = () => {
  return (
    <figure className={classes.logo}>
      <img src={LogoImg} alt="Logo" />
      <figcaption>pomoDo</figcaption>
    </figure>
  );
};
export default Logo;
