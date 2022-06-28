import { Cards, Pagination } from "../components";
import { useCards } from "../context/cardsContext";
import { Spinner } from "@blueprintjs/core";
import styles from "../styles/home.module.scss";

export default function Home() {
  const { loading, cards } = useCards();

  return (
    <div
      className={`${styles.container} ${
        loading && !cards ? "bp4-skeleton" : ""
      }`}
    >
      <h2 className={styles.title}>Контент</h2>
      {loading ? (
        <div className={styles.loader}>
          <Spinner intent="primary" size={50} />
        </div>
      ) : (
        <Cards />
      )}
      {cards ? <Pagination /> : null}
    </div>
  );
}
