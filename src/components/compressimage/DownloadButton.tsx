import { FiDownload } from 'react-icons/fi'

const DownloadButton = ({ url }: {url?: string}) => {

  return (<FiDownload style={{cursor: 'pointer'}} className="download-btn" size = {13}/>);

};





export default DownloadButton;

