import { useCards } from "../../context/cardsContext";
import { Icon, Text } from "@blueprintjs/core";
import { useWindowSize } from "../../hooks";
import { useAuth } from "../../context/authContext";
import styles from "./header.module.scss";
import { AuthButton } from "../UI/AuthButton";
import { DialogContent } from "../DialogContent";

export const Header = () => {
  const { cards, loading } = useCards();
  const { email } = useAuth();
  const bp = useWindowSize();

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Тестовое задание</h1>
      <div className={!cards && loading ? "bp4-skeleton" : ""}>
        {!cards ? (
          <AuthButton renderDialog={(handleClose) => <DialogContent onClose={handleClose}/>} />
        ) : (
          <div className={styles.header__profile}>
            {bp === "xs" ? null : (
              <Text className={styles.header__user} tagName="p">
                {email}
              </Text>
            )}
            <Icon htmlTitle={email} intent="success" icon="user" size={30} />
          </div>
        )}
      </div>
    </header>
  );
};
