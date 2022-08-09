import React, { ReactNode } from "react";

import styles from "./Layout.module.scss";

interface ILayout {
  children: ReactNode;
}
const Layout = ({ children }: ILayout) => <div className={styles.container}>{children}</div>;

export default Layout;
