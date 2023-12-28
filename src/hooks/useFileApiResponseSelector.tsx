import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ApiResponse } from "../redux/filesUploadApiResponseSlice";

const useFileApiResponse = ()=>{
    const filesUploadApiResponse:ApiResponse = useSelector((state: RootState) => state.filesUploadApiResponse.apiResponse);
    return { filesUploadApiResponse };
}

export default useFileApiResponse;
