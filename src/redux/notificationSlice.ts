// notificationSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SideNotificationPositionProps, UrgencyProps } from '../components/sidenotification/SideNotification';

export interface SideNotificationItem {
    id: number;
    message: string;
    position: SideNotificationPositionProps;
    urgency?: UrgencyProps;
  }

interface NotificationState {
  notifications: SideNotificationItem[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<SideNotificationItem>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
