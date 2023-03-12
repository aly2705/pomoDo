import classes from './Layout.module.scss';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const Layout = props => {
  const location = useLocation();
  //if (location.pathname === '/login') return;
  return (
    <div
      className={`${classes.container} ${
        location.pathname === '/login' ? classes['container--simple'] : ''
      }`}
    >
      <Header />
      <Sidebar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
export default Layout;
