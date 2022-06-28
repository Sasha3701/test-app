import { Button, InputGroup, Label } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useCards } from "../../context/cardsContext";
import { validate } from "../../utils";
import styles from "./dialog-content.module.scss";

export const DialogContent = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorObj, setErrorObj] = useState({ email: false, password: false });
  const { login, error, clearError, loading } = useAuth();
  const { fetchCards, fetchCardsCount, page, limit } = useCards();

  useEffect(() => {
    return () => clearError();
  }, []);

  const handleButtonClick = async () => {
    const data = await login(email, password);
    if (data?.success) {
      Promise.all([fetchCards(page, limit, true), fetchCardsCount(true)]);
      onClose();
    }
  };

  const handleLockClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    const isCorrect = validate(type, value);
    if (!isCorrect) {
      setErrorObj((prevState) => ({ ...prevState, [type]: true }));
    } else {
      setErrorObj((prevState) => ({ ...prevState, [type]: false }));
    }
    if (type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className={styles.dialog}>
      <Label>
        Почта
        <InputGroup
          className={styles.dialog__input}
          placeholder="Введите почту ..."
          value={email}
          name="email"
          onChange={handleChange}
          intent={error || errorObj.email ? "warning" : "none"}
          fill
        />
      </Label>
      <Label>
        Пароль
        <InputGroup
          className={styles.dialog__input}
          placeholder="Введите пароль ..."
          value={password}
          name="password"
          intent={error || errorObj.password ? "warning" : "none"}
          onChange={handleChange}
          rightElement={
            <Tooltip2
              content={`${showPassword ? "Скрыть" : "Показать"} пароль`}
            >
              <Button
                icon={showPassword ? "unlock" : "lock"}
                intent="warning"
                minimal={true}
                onClick={handleLockClick}
              />
            </Tooltip2>
          }
          type={showPassword ? "text" : "password"}
          fill
        />
      </Label>
      <p className={styles.dialog__error}>{error}</p>
      <Button
        disabled={errorObj.email || errorObj.password}
        onClick={handleButtonClick}
        intent="primary"
        text="Вход"
        loading={loading}
        fill
      />
    </div>
  );
};
