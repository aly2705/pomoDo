import classes from './MobileMenu.module.scss';
import { useState } from 'react';

const MobileMenu = props => {
  const [isOpened, setIsOpened] = useState(false);
  const CSSclasses = isOpened
    ? `${classes['mobile-menu']} ${classes['shown']}`
    : classes['mobile-menu'];

  const toggleMenuHandler = () => {
    props.onToggleSidebar(!isOpened);
    setIsOpened(prevValue => !prevValue);
  };

  return (
    <button className={CSSclasses} onClick={toggleMenuHandler}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MobileMenu;
