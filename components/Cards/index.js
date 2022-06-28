import { Card } from "../Card";
import { useCards } from "../../context/cardsContext";
import styles from "./cards.module.scss";

export const Cards = () => {
  const { cards } = useCards();

  return cards ? (
    <ul className={styles.cards}>
      {cards.map((card) => (
        <li className={styles.cards__item} key={card._id}>
          <Card card={card} />
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.text}>Необходимо авторизоваться...</p>
  );
};
