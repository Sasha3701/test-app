import { Header } from "../components";
import styles from "./layout.module.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};
