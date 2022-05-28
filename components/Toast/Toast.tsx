import React, { useEffect, useState } from "react";

import styles from './Toast.module.scss';

interface IToast {
  message: string,
  type: 'error' | 'warning' | 'success',
  isVisible?: boolean,
}
const Toast = ({ message, isVisible, type }: IToast) => {
  if (!isVisible) {
    return null;
  }

  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const handleDismiss = () => setIsDismissed(true);

  useEffect(() => {
    setTimeout(() => {
      handleDismiss();
    }, 5000);
  }, []);

  if (isDismissed) {
    return null;
  }

  return (
    <div className={styles.container} onClick={handleDismiss}>
      <span>{type}: {message}</span>
    </div>
  );
};

export default Toast;
