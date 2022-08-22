import classes from './MobileMenu.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { mobileMenuActions } from '../../../store/mobile-menu';

const MobileMenu = props => {
  const dispatch = useDispatch();
  const isOpened = useSelector(state => state.mobileMenu.isOpened);
  const CSSclasses = isOpened
    ? `${classes['mobile-menu']} ${classes['shown']}`
    : classes['mobile-menu'];

  const toggleMenuHandler = () => {
    dispatch(mobileMenuActions.toggleMenu());
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
