import React, { useState, useEffect } from "react";

export const useIsElementActive = (id: number, buttonType: 'reply' | 'edit' | 'delete') => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const onFocus = (e: any) => {
      const replyButtonIsActive = e.target.parentNode.id.includes(buttonType)
        && e.target.parentNode.id.split(`${buttonType} `)[1] === id.toString();
      if (replyButtonIsActive) {
        setIsActive(true);
      }
    }
    const onBlur = () => {
      setIsActive(false);
    };

    window.addEventListener('mousedown', onFocus);
    window.addEventListener('mouseup', onBlur);
    window.addEventListener('drag', onFocus);
    window.addEventListener('dragend', onBlur);

    return () => {
      window.removeEventListener('mousedown', onFocus);
      window.removeEventListener('mouseup', onBlur);
      window.addEventListener('drag', onFocus);
      window.addEventListener('dragend', onBlur);
    };

  }, []);

  return isActive;
};
