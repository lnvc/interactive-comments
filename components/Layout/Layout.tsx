import React from 'react';

import styles from './Layout.module.scss';

interface ILayout {
  children: any,
}
const Layout = ({ children }: ILayout) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Layout;
