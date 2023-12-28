// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import fileListReducer from './fileListSlice';
import notificationReducer from './notificationSlice';
import filesUploadsApiResponseSlice from './filesUploadApiResponseSlice';

const rootReducer = combineReducers({
    notifications: notificationReducer,
    fileList: fileListReducer,
    filesUploadApiResponse: filesUploadsApiResponseSlice,

  // Add other reducers as needed
});


export default rootReducer;
