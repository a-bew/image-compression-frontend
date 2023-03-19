import { useState } from 'react';
import Navbar from './components/Navbar'
import s from './app.module.scss'
import FilesUpload  from './components/FilesUpload'
import TableRow from './components/TableRow';
import t from './components/tablerow.module.scss';
import { TimeProp } from './components/Type'
import uuid from 'react-uuid'
import { copyArrayOfObjects } from './utils';

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

if (!process.env.REACT_APP_DEBUG) {
  console.log = () => { };
  console.info = () => { };
  console.warn = () => { };
  console.error = () => { };
  console.debug = () => { };
}

function App() {

  const [timeLeft, setTimeLeft] = useState<TimeProp>({});

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const handleUpload = async (uploadedFiles: FileList) => {
    const formData = new FormData();
    const processingIdss:string[] = [];
    let stored:any = [];

    uploadedFiles && Array.from(Array(uploadedFiles.length).keys()).map((i)=>{

      const file = uploadedFiles.item(i);

      const id = uuid()

      if (file) {
        const url = URL.createObjectURL(file);
        // use the url
        stored.push({
          id,
          uncompressedFile: url,
          compressedFile: '',
          fileSize: `${(file.size ?? 0) / 1000000}MB`, // in mb
          downloadLinK: '',
        })

        // Append each file to the FormData object
        formData.append('files', uploadedFiles[i]);
        
        // Append id to track upload
        processingIdss.push(id);

      } else {
        // handle the case when file is null
        return null;
      }

    });

    let allFiles = [...fileList, ...stored]
    const fileListCloned:any = copyArrayOfObjects(fileList);

    await setFileList(allFiles);

    try {

      const response = await fetch(`${baseURL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      // Handle the response data here
  
      const cloned:any = copyArrayOfObjects(stored);
      const timenow: any = {}

        for (let i = 0; i < cloned.length; i++) {

          const trackedId = processingIdss[i];

          const returnedIndex =  processingIdss.findIndex((id=>{
            return id ===  trackedId
          }));
    
          const size =  data.files[returnedIndex].size;
  
          const minutes = 4; 
          const seconds = 60

      const filename = data.files[returnedIndex].compressedFile.split('/').pop();
          // setTimeout(()=>{

           timenow[processingIdss[returnedIndex]] = minutes * 60 + seconds;
      //  }, 1000)

          cloned[returnedIndex] = {...cloned[returnedIndex], 
            compressedFile: `${baseURL}/${filename}`, 
            downloadLinK: `${baseURL}/${filename}`,
            fileSize: `${cloned[i].fileSize} / ${(size ?? 0) / 1000000}MB`, // in mb
            
          }
        }

        allFiles = [...fileListCloned, ...cloned];

        await setTimeLeft({...timeLeft, ...timenow});

        setFileList(allFiles);
  

    } catch (error) {

      setFileList({...fileList});

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
                    {<th>File size - Old / New</th>}
                    {<th>Download Link</th>}
                  </tr>
                </thead>

                <tbody>
                  { 
                    fileList && Array.from(Array(fileList.length).keys()).reverse().map((i)=>{
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
                              setTimeLeft : setTimeLeft 
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
              </table>
            </div>

            </div>
          </div>
      </div>
    </div>
  );
}

export default App;


