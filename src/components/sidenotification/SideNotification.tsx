import React, { useEffect } from 'react';
import classNames from 'classnames';
import s from './SideNotification.module.scss';

export type SideNotificationPositionProps = 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
export type UrgencyProps = 'default' | 'urgent';
interface NotificationProps {
  id: number;
  message: string;
  position?: SideNotificationPositionProps;
  urgency?: UrgencyProps; // Added urgency prop
  duration?: number; // in milliseconds
  onClose: (id: number) => void;
}

const SideNotification: React.FC<NotificationProps> = ({  id, message, position = 'top-right', duration = 3000, urgency = 'default', onClose }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timeout);
    }, [duration, id, onClose]);

    const handleRemoveNotification = () => {
        onClose(id);
    };

  return (
    <div className={classNames(s.notification, s[position], s[urgency])} onClick={handleRemoveNotification}>
      <div className={s.message}>{message}</div>
      <button className={s.closeButton} onClick={(e) => e.stopPropagation()}>
        X
      </button>
    </div>
  );
};

export default SideNotification;