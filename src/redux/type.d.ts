interface FileListItem {
    id: string; 
    uncompressedFile: string;
    compressedFile: string;
    fileSize: string; // in mb
    downloadLinK: string;
    countDown: {
      minutesLeft:number;
      secondsLeft:number;
    };
}