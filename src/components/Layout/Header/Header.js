import classes from "./Header.module.scss";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import ProfileOptions from "./ProfileOptions";

const Header = () => {
  return (
    <header className={classes.header}>
      <MobileMenu />
      <Logo />
      <ProfileOptions />
    </header>
  );
};

export default Header;
