import classes from './Layout.module.scss';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { useState } from 'react';

const Layout = props => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const toggleSidebarHandler = menuState => {
    setMobileMenuIsOpen(menuState);
  };
  return (
    <div className={classes.container}>
      <Header onToggleSidebar={toggleSidebarHandler} />
      <Sidebar opened={mobileMenuIsOpen} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
export default Layout;
