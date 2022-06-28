import Head from "next/head";
import { Header } from "../components";
import styles from "./layout.module.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Тестовое задание</title>
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};
