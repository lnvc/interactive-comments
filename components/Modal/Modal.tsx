import React from "react";

import styles from "./Modal.module.scss";

interface IModal {
  title: string;
  message: string;
  cancel: string;
  confirm: string;
  handleCancel: () => void;
  handleDelete: () => void;
}

const Modal = ({ title, message, cancel, confirm, handleCancel, handleDelete }: IModal) => (
  <>
    <div
      role="button"
      aria-label="button"
      tabIndex={0}
      onKeyDown={() => {}}
      className={styles.container}
      onClick={handleCancel}
      onTouchEnd={handleCancel}
    />
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <span className={styles.title}>{title}</span>
        <span className={styles.message}>{message}</span>
        <span
          onKeyDown={() => {}}
          role="button"
          aria-label="button"
          tabIndex={0}
          className={styles.cancel}
          onClick={handleCancel}
        >
          {cancel}
        </span>
        <span
          onKeyDown={() => {}}
          role="button"
          aria-label="button"
          tabIndex={0}
          className={styles.confirm}
          onClick={handleDelete}
        >
          {confirm}
        </span>
      </div>
    </div>
  </>
);

export default Modal;
