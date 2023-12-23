// Dialog.tsx
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import  s from './dialog.module.scss';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = React.memo(({ isOpen, onClose, children }) => {

  const handleClick = useCallback((event: any) => {
    if (event.target.className === 'dialog_dialog-overlay__PnSDC') {
        onClose();
    }
}, [onClose]);

useEffect(() => {
    if (isOpen) {
        document.addEventListener('click', handleClick);
    } else {
        document.removeEventListener('click', handleClick);
    }
    return () => {
        document.removeEventListener('click', handleClick);
    };
}, [handleClick, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={s["dialog-overlay"]}  >
      <div className={s["dialog-content"]}>
        <button className={s["close-button"]} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
});

export default Dialog;