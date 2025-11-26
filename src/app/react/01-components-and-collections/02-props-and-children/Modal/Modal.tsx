import React, { ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <div className={css.modalOverlay} onClick={closeModal}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
