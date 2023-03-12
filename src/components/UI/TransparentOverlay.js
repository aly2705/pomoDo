import classes from './TransparentOverlay.module.scss';
import ReactDOM from 'react-dom';

const TransparentOverlay = props => {
  return ReactDOM.createPortal(
    <div className={classes.transparent_overlay} onClick={props.onClick}></div>,
    document.querySelector('#overlays')
  );
};

export default TransparentOverlay;
