import React from "react";

import styles from './Modal.module.scss';

interface IModal {
  title: string,
  message: string,
  cancel: string,
  confirm: string,
  handleCancel: () => void,
  handleDelete: () => void,
}

const Modal = ({
  title,
  message,
  cancel,
  confirm,
  handleCancel,
  handleDelete,
}: IModal) => {
  return (
    <>
      <div className={styles.container} onClick={handleCancel} onTouchEnd={handleCancel}></div>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <span className={styles.title}>{title}</span>
          <span className={styles.message}>{message}</span>
          <span className={styles.cancel} onClick={handleCancel}>{cancel}</span>
          <span className={styles.confirm} onClick={handleDelete}>{confirm}</span>
        </div>
      </div>
    </>
  );
};

export default Modal;
