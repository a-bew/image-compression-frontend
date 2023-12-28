import React from 'react'
import { ApiResponse, setApiResponse } from '../redux/filesUploadApiResponseSlice';
import { useDispatch } from 'react-redux';

const useFileApiResponseDispatch = () => {

    const dispatch = useDispatch();
    // Dispatch

    const setApiResponseAsync = (apiResponse: ApiResponse) => {
        console.log("apiResponse", apiResponse);
        
        dispatch(setApiResponse(apiResponse));
    }

    return { setApiResponseAsync }

}

export default useFileApiResponseDispatch