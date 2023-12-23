import React, { useMemo } from "react";
import { ItemProps } from "./Type";
import useCountdown from "./useCountdown";
import RoundedLoader from "./RoundedLoader";
import { FcDeleteDatabase } from "react-icons/fc";
import DownloadButton from "./DownloadButton";
import { getFileNameFromUrl } from "../../utils";
import { VITE_APP_BACKEND_URL } from '../../api/secrets';

const baseURL = VITE_APP_BACKEND_URL;

interface DownloadLinkProps {
    item: ItemProps;
}

const DownloadLink: React.FC<DownloadLinkProps> = React.memo(({ item }) => {

    const {minutesLeft, secondsLeft} = useCountdown({id: item.id, timeLeft:item.timeLeft, setTimeLeft: item.setTimeLeft});

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
      <span>
        {!item.downloadLinK ? (
          <RoundedLoader />
        ) : (
          <span>
            {parseInt(minutesLeft) === 0 && parseInt(secondsLeft) === 0 ? (
              <FcDeleteDatabase size={15} />
            ) : (
              <span onClick={()=>handleFileDownload(item.downloadLinK)} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', cursor: 'pointer' }}>
                <DownloadButton url={item.downloadLinK} />
                <span>{minutesLeft}:{secondsLeft}</span>
              </span>
            )}
          </span>
        )}
      </span>
    );
  });
  

export default DownloadLink;