import React, { useMemo } from "react";
import { ItemProps } from "./Type";
import useCountdown from "./useCountdown";
import RoundedLoader from "./RoundedLoader";
import { FcDeleteDatabase } from "react-icons/fc";
import DownloadButton from "./DownloadButton";
import { VITE_APP_BACKEND_URL } from '../../api/secrets';

const baseURL = VITE_APP_BACKEND_URL;

type DownloadLinkProps = ItemProps & {
    zipped: any
}

type ZipDownloadLinkProps =  {
  item: DownloadLinkProps;
}

function getFileNameFromContentDisposition(contentDisposition: string | null) {
  if (!contentDisposition) return null;

  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match ? match[1] : null;
}

const ZipDownloadLink: React.FC<ZipDownloadLinkProps> = React.memo(({ item }) => {

    const {minutesLeft, secondsLeft} = useCountdown({id: item.id, timeLeft:item.timeLeft, setTimeLeft: item.setTimeLeft});

    const handleFileDownload = (fileNames: string[]) => {
      fetch(`${baseURL}/download/download-zip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileNames }), // Send array of file names to server
      })
        .then((response) => {
          // Extract filename from Content-Disposition header
          const contentDisposition:any = getFileNameFromContentDisposition( response.headers.get('Content-Disposition'));
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          let downloadFilename = 'files.zip'; // Default filename
    
          // if (matches != null && matches[1]) {
            const result = contentDisposition; // Remove surrounding quotes if present
          // }

          if (result){
            downloadFilename = result;
          }
    
          return response.blob().then((blob) => ({ blob, downloadFilename }));
        })
        .then(({ blob, downloadFilename }) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = downloadFilename; // Set download filename based on server response
          a.click();
          URL.revokeObjectURL(url);
        })
        .catch((error: any) => {
          console.error('Failed to download the ZIP file:', error);
        });
    };
    
    const fileNames = item.zipped.map((zipped: any) => zipped.compressedFile.split('/').pop());

    return (
      <span>
        {!item.downloadLinK ? (
          <RoundedLoader />
        ) : (
          <span>
            {parseInt(minutesLeft) === 0 && parseInt(secondsLeft) === 0 ? (
              <FcDeleteDatabase size={15} />
            ) : (
              <span onClick={()=>handleFileDownload(fileNames)} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', cursor: 'pointer' }}>
                <DownloadButton />
                <span>{minutesLeft}:{secondsLeft}</span>
              </span>
            )}
          </span>
        )}
      </span>
    );
  });
  

export default ZipDownloadLink;