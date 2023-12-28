// useNotification.ts

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SideNotificationItem, addNotification, removeNotification } from '../redux/notificationSlice';
import { SideNotificationPositionProps, UrgencyProps } from '../components/sidenotification/SideNotification';

interface UseNotification {
  notifications: SideNotificationItem[];
  showNotification: (message: string, position: SideNotificationPositionProps, urgency?:UrgencyProps, duration?: number) => void;
  onClose: (id: number) => void;
}

const useNotification = (): UseNotification => {
  const dispatch = useDispatch();

  const notifications:SideNotificationItem[] = useSelector((state: RootState) => state.notifications.notifications);

  const showNotification = (message: string, position: SideNotificationPositionProps, urgency?:UrgencyProps, duration: number = 3000) =>   {
    const id = Date.now();
    dispatch(addNotification({ id, message, position, urgency }));
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  };

  const onClose= (id:number) => dispatch(removeNotification(id))

  return { notifications, showNotification, onClose };
};

export default useNotification;