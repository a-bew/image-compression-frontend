import React, { useState } from 'react';
import Navbar from './components/Navbar'
import s from './app.module.scss'
import FilesUpload  from './components/FilesUpload'
import TableRow from './components/TableRow';
import t from './components/tablerow.module.scss';
import { TableRowProps } from './components/Type'
import uuid from 'react-uuid'

function App() {


  const [files, setFiles] = useState<FileList | null>(null);
  const[ data, setData] = useState();
  const handleUpload = (uploadedFiles: FileList) => {
    setFiles(uploadedFiles);
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
                    files && Array.from(Array(files.length).keys()).map((i)=>{
                      const file = files.item(i);
                      if (file) {
                        const url = URL.createObjectURL(file);
                        // use the url
                        return (
                          <TableRow
                            key={uuid()}
                            item={{
                              uncompressedFile: url,
                              compressedFile: '',
                              fileSize: `${(file.size ?? 0) / 1000000} MB`, // in mb
                              downloadLinK: '',
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


