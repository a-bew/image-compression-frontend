import { FiDownload } from 'react-icons/fi'
import { getFileNameFromUrl } from '../../utils';
import { VITE_APP_BACKEND_URL } from '../../api/secrets';

const baseURL = VITE_APP_BACKEND_URL;

const DownloadButton = ({ url }: {url: string}) => {
    console.log("url.split('/').pop()", url.split('/').pop(), url);
    const handleClick = () => {

      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'; 
      link.download = url.split('/').pop() || '';
      link.click();
    };
  
    const handleFileDownload = (url:string) => {
      const fileName = getFileNameFromUrl(url);


      fetch(`${baseURL}/download/${fileName}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error:any)=>{
        console.error('Failed to download the file:', error)
      })
    }
    return (
      <FiDownload style={{cursor: 'pointer'}} className="download-btn" onClick={()=>handleFileDownload(url)} size = {13}/>    );
  };





export default DownloadButton;

