// Dialog.tsx
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import  s from './dialog.module.scss';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = React.memo(({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
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

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // event.preventDefault();
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
}, [dialogRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={s["dialog-overlay"]}  >
      <div className={s["dialog-content"]} ref = {dialogRef}>
        {/* <button className={s["close-button"]} onClick={onClose}>
          Close
        </button> */}
        <div className={s["dialog-body"]}>
          {children}

        </div>
      </div>
    </div>
  );
});

export default Dialog;