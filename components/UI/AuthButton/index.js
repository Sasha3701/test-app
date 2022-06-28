import { useState, useCallback } from "react";
import { Button, Dialog } from "@blueprintjs/core";
import { useWindowSize } from "../../../hooks";
import styles from "./auth-button.module.scss";

export const AuthButton = ({ renderDialog }) => {
  const bp = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = useCallback(() => setIsOpen(!isOpen), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button
        onClick={handleButtonClick}
        large
        outlined
        rightIcon="log-in"
        text={bp === "xs" ? null : "Вход"}
      />
      <Dialog
        className={bp === "xs" ? styles.full : ""}
        title="Вход"
        isOpen={isOpen}
        onClose={handleClose}
      >
        {renderDialog(handleClose)}
      </Dialog>
    </>
  );
};
