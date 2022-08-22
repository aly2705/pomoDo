import classes from './Header.module.scss';

import Logo from './Logo';
import MobileMenu from './MobileMenu';
import ProfileOptions from './ProfileOptions';

const Header = props => {
  return (
    <header className={classes.header}>
      <MobileMenu onToggleSidebar={props.onToggleSidebar} />
      <Logo />
      <ProfileOptions />
    </header>
  );
};

export default Header;
