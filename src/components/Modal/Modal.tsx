import React, { ReactNode, memo } from "react";
import styles from "./Modal.module.scss";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal}>
        <button className={styles.close__button} onClick={onClose}>
          <CloseIcon />
        </button>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Modal, (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.onClose === nextProps.onClose
  );
});
