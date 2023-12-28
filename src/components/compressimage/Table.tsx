import React, { useEffect, useState } from 'react'
import TableRow from './TableRow';
import uuid from 'react-uuid';
import t from './tablerow.module.scss';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface TableProps {
    fileList: any
    timeLeft :any,
    setTimeLeft : any,
    showDropdownMenu: any, 
    setShowDropdownMenu: any
}


const Table = ({fileList, timeLeft, setTimeLeft, showDropdownMenu, setShowDropdownMenu}: TableProps) => {

    const [visibleRows, setVisibleRows] = useState<number>(5); // Number of initially visible rows
    const [loadedRows, setLoadedRows] = useState<number>(0);
  
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadedRows((prev) => prev + 1);
          setVisibleRows((prev) => prev + 5); // Load additional 5 rows when the last visible row is about to enter the viewport
        }
      });
    };
  
    const intersectionObserverRef = useIntersectionObserver(handleIntersection);
  
    useEffect(() => {
      if (visibleRows < fileList.length) {
        // Load additional rows when initially rendering the component
        setVisibleRows((prev) => prev + 5);
      }
    }, [fileList]);
  
    return (
    <div className={t['tag-tagtable']}>
              <div className={t['tag-tagtable-container']}>
              <table>
                {fileList.length > 0 && <thead>
                  <tr>
                    {<th>SN</th>}
                    {<th>Uncompressed</th>}
                    {<th>Compressed</th>}
                    {<th>File size - Old / New</th>}
                    {<th>Download Link</th>}
                    {<th>Options</th>}
                  </tr>
                </thead>}

                <tbody>
                  { 
                    fileList && 
                    Array.from(Array(visibleRows).keys()).reverse().map((i) => {

                    // Array.from(Array(fileList.length).keys()).reverse().map((i)=>{
                      const index = Math.abs(i - fileList.length+1);
                      const file = fileList[i];
                      if (file) {
                        // use the url
                        return (
                          <TableRow
                            key={uuid()}
                            item={{
                              id: file.id,
                              uncompressedFile: file.uncompressedFile,
                              compressedFile: file.compressedFile,
                              fileSize: file.fileSize, // in mb
                              downloadLinK: file.downloadLinK,
                              timeLeft :timeLeft,
                              setTimeLeft : setTimeLeft,
                              showDropdownMenu: showDropdownMenu, 
                              setShowDropdownMenu: setShowDropdownMenu
                            }}
                            
                            index={index} 
                          />
                        );
                      } else {
                        // handle the case when file is null
                        return null;
                      }

                    })
                  }
                </tbody>
                {loadedRows < fileList.length && <div ref={intersectionObserverRef}></div>}

              </table>
            </div>

            </div>
  )
}

export default Table