import { FiDownload } from 'react-icons/fi'

const DownloadButton = ({ url }: {url: string}) => {
    console.log("url.split('/').pop()", url.split('/').pop(), url);
    const handleClick = () => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'; 
      link.download = url.split('/').pop() || '';
      link.click();
    };
  
    return (
      <FiDownload style={{cursor: 'pointer'}} className="download-btn" onClick={handleClick} size = {13}/>    );
  };





export default DownloadButton;