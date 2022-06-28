import { Card as CardComponent, Elevation } from "@blueprintjs/core";
import styles from "./card.module.scss";

export const Card = ({ card: { _id, category, name } }) => {
  return (
    <CardComponent interactive={true} elevation={Elevation.TWO}>
      <h3 className={styles.card__title}>{name}</h3>
      <p className={styles.card__id}>{_id}</p>
      <p className={styles.card__category}>{category}</p>
    </CardComponent>
  );
};
