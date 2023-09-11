import { ReactNode } from "react";

import styles from "./Main.module.scss";

interface MainContentProps {
  children?: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <main className={styles.main__wrapper}>{children}</main>;
};

export default MainContent;
