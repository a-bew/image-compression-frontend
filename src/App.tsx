import React, { Dispatch, SetStateAction, useState } from 'react';
import Navbar from './components/Navbar'
import s from './app.module.scss'
import FilesUpload  from './components/FilesUpload'
import TableRow from './components/TableRow';
import t from './components/tablerow.module.scss';
import { TableRowProps } from './components/Type'
import uuid from 'react-uuid'

interface FileListItem {
  id: string; 
  uncompressedFile: string;
  compressedFile: string;
  fileSize: string; // in mb
  downloadLinK: string;
}

interface FileListProps {
  fileList: FileListItem[];
  setFileList: Dispatch<SetStateAction<FileListItem[]>>;
}


function App() {
   const [files, setFiles] = useState<FileList | null>(null);
  // const [processingIds, setProcessingIds] = useState<string[]>([]);

  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const handleUpload = async (uploadedFiles: FileList) => {
    const formData = new FormData();
    const processingIdss:string[] = [];

    uploadedFiles && Array.from(Array(uploadedFiles.length).keys()).map((i)=>{

      const file = uploadedFiles.item(i);

      const id = uuid()

      if (file) {
        const url = URL.createObjectURL(file);
        // use the url
        setFileList([...fileList, {
          id,
          uncompressedFile: url,
          compressedFile: '',
          fileSize: `${(file.size ?? 0) / 1000000} MB`, // in mb
          downloadLinK: '',
        }])

        // Append each file to the FormData object
        formData.append('files', uploadedFiles[i]);
        
        // Append id to track upload
        processingIdss.push(id);

      } else {
        // handle the case when file is null
        return null;
      }
    });

    try {

      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      // Handle the response data here
      console.log(data.files);
      
      for (let i = 0; i < processingIdss.length; i++) {
        const trackedId = processingIdss[i];
        const returnedIndex =  fileList.findIndex((item=>{
          return item.id ===  trackedId
        }));
        fileList[returnedIndex] = {...fileList[returnedIndex], compressedFile: data.files[returnedIndex]}
      }

      setFileList([...fileList]);

    } catch (error) {

      setFiles(uploadedFiles);

      // Handle the error here
      console.error(error);
    }

  };

  return (
    <div className = {s.container}>
      <Navbar title = "Image Compression App" />
        <div className = {s['upload-home']}>
          <div className = {s['filesupload']}>
            <FilesUpload  onUpload={handleUpload} maxFileSize={512000000}  />
          </div>
          <div>
            <div className={t['tag-tagtable']}>
              <div className={t['tag-tagtable-container']}>
              <table>
                <thead>
                  <tr>
                    {<th>SN</th>}
                    {<th>Uncompressed</th>}
                    {<th>Compressed</th>}
                    {<th>File size</th>}
                    {<th>Download Link</th>}
                  </tr>
                </thead>

                <tbody>
                  { 
                    fileList && Array.from(Array(fileList.length).keys()).map((i)=>{
                      const file = fileList[i];
                      if (file) {
                        // use the url
                        return (
                          <TableRow
                            key={uuid()}
                            item={{
                              uncompressedFile: file.uncompressedFile,
                              compressedFile: file.compressedFile,
                              fileSize: file.fileSize, // in mb
                              downloadLinK: file.downloadLinK,
                            }}

                            index={i} 
                          />
                        );
                      } else {
                        // handle the case when file is null
                        return null;
                      }

                    })
                  }
                </tbody>
              </table>
            </div>

            </div>
          </div>
      </div>
    </div>
  );
}

export default App;


