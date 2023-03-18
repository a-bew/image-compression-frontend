import React from "react";
import { FiDownload } from 'react-icons/fi'

const DownloadButton = ({ url }: {url: string}) => {
    const handleClick = () => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'; 
      link.download = 'image.jpg';
      link.click();
    };
  
    return (
      <FiDownload style={{cursor: 'pointer'}} className="download-btn" onClick={handleClick} size = {13}/>    );
  };

export default DownloadButton;