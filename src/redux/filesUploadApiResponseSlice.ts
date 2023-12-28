// apiResponseSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export interface ApiResponse {
  loading: boolean;
  error: string | null;
  data: any | null;
}

interface FilesUploadApiResponseState {
  apiResponse: ApiResponse;
}


const initialState: FilesUploadApiResponseState = {
  apiResponse: {
    loading: false,
    error: null,
    data: null,
  },
};

const filesUploadsApiResponseSlice = createSlice({
  name: 'fileUploadsApiResponse',
  initialState,
  reducers: {
    setApiResponse: (state, action: PayloadAction<ApiResponse>) => {
      state.apiResponse = action.payload;
    },
  },
});

export const { setApiResponse } = filesUploadsApiResponseSlice.actions;


export default filesUploadsApiResponseSlice.reducer;