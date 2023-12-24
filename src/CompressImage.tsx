import { useState } from 'react';
import s from './app.module.scss'
import FilesUpload  from './components/compressimage/FilesUpload'
import TableRow from './components/compressimage/TableRow';
import t from './components/compressimage/tablerow.module.scss';
import { ShowDropdownMenuProp, TimeProp } from './components/compressimage/Type'
import uuid from 'react-uuid'
import { copyArrayOfObjects } from './utils';
import FeatureConfigSection from './components/configfeatures/FeatureConfigSectionProps';
import Dialog from './components/customdialog/Dialog';
import { VITE_APP_BACKEND_URL } from './api/secrets';
import React from 'react';

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


// Define a TypeScript interface for the props
interface CompressedImageProps {
  targetDivRef: React.RefObject<HTMLDivElement>;
}


const CompressImage: React.FC<CompressedImageProps> = React.memo(({ targetDivRef }) => {

  const [timeLeft, setTimeLeft] = useState<TimeProp>({});

  const baseURL = VITE_APP_BACKEND_URL;

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

    // imageFormat, preserveAspectRatio, width, height, quality, colorization
    const params = new URLSearchParams();
    
    let allFiles = [...fileList, ...stored]
    const fileListCloned:any = copyArrayOfObjects(fileList);

    await setFileList(allFiles);

    try {

      const url = `${baseURL}/manipulate-image?${params.toString()}`;

      const response = await fetch(`${baseURL}/upload/manipulate-images?quality=${quality}&imageFormat=${imageFormat}&width=${width}&height=${height}&color=${colorization}&aspect=${preserveAspectRatio}`, {
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

      timenow[processingIdss[returnedIndex]] = minutes * 60 + seconds;
          cloned[returnedIndex] = {
            ...cloned[returnedIndex], 
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

  // State variables to hold configuration values
  const [imageFormat, setImageFormat] = useState<string>('jpeg');
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [quality, setQuality] = useState<number>(100);
  const [colorization, setColorization] = useState<string>('default');
  const [showDropdownMenu, setShowDropdownMenu] = useState<ShowDropdownMenuProp>(null);

  const configDefaultValues = {
    imageFormat,
    preserveAspectRatio,
    width,
    height,
    quality,
    colorization
  };

  // Event handlers for configuration changes
  const handleImageFormatChange = (format: string) => {
    setImageFormat(format);
  };

  const handleAspectRatioChange = (preserve: boolean, newWidth: number) => {
    setPreserveAspectRatio(preserve);
    setWidth(newWidth);
  };

  const handleDimensionsChange = (newWidth: number, newHeight: number) => {
    // Handle the width and height changes here
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleQualityChange = (isLossless: boolean, newQuality: number) => {
    // Handle quality changes here
    setQuality(newQuality);
  };

  const handleColorizationChange = (color: string) => {
    setColorization(color);
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const [featureName, setFeatureName] = useState('');

  const featureChangeHandle = (featureName: string)=>{
    setFeatureName(featureName)
    openDialog();
  }

  return (
    <div className = {s.container} ref={targetDivRef}>
        <div className = {s['upload-home']}>
          <div className = {s['filesupload']} style = {{marginBottom: fileList.length > 0 ? '30px': 'inherit' }}>
          <h2 style={{textAlign: 'center'}}>Drop File To Upload</h2>

              <div style={{width: '100%'}}>

              <FilesUpload  onUpload={handleUpload} maxFileSize={512000000}  />

              </div>


            {/* <div className={s['feature-metrics']}>
              <span onClick = {()=>featureChangeHandle('image-format')}>Image Format&nbsp;<span className={ s['label-style'] }>{imageFormat}</span></span>
              <div className={s["vertical-bottom-line"]}></div>

              <span onClick = {()=>featureChangeHandle('aspect-ratio')} >Aspect Ratio&nbsp;<span className={ s['label-style'] }>{`${preserveAspectRatio}`}</span></span>

              <div className={s["vertical-bottom-line"]}></div>

                <span onClick = {()=>featureChangeHandle('custom-dimension')}>width:<span className={ s['label-style'] }>{width}</span></span>
                <div className={s["vertical-bottom-line"]}></div>

                <span onClick = {()=>featureChangeHandle('custom-dimension')}> height:<span className={ s['label-style'] }>{height}</span></span>


              <div className={s["vertical-bottom-line"]}></div>

              <span onClick = {()=>featureChangeHandle('quality-optimization')}>Quality&nbsp;<span className={ s['label-style'] }>{quality}</span></span>
              <div className={s["vertical-bottom-line"]}></div>

              <span  onClick = {()=>featureChangeHandle('custom-color')}>Color&nbsp;<span className={ s['label-style'] }>{colorization}</span></span>
            </div> */}
<div className={s['feature-metrics']}>
      <div className={s['feature-card']} onClick={() => featureChangeHandle('image-format')}>
        Image Format <span className={s['label-style']}>{imageFormat}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('aspect-ratio')}>
        Aspect Ratio <span className={s['label-style']}>{`${preserveAspectRatio}`}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('custom-dimension')}>
        Width: <span className={s['label-style']}>{width}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('custom-dimension')}>
        Height: <span className={s['label-style']}>{height}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('quality-optimization')}>
        Quality <span className={s['label-style']}>{quality}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('custom-color')}>
        Color <span className={s['label-style']}>{colorization}</span>
      </div>
    </div>            
          </div>
          <div>
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
              </table>
            </div>

            </div>
          </div>
      </div>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <FeatureConfigSection
          configDefaultValues = { configDefaultValues }
          onClose={closeDialog}
          featureName = {featureName}
          setFeatureName = {setFeatureName}
          onImageFormatChange={handleImageFormatChange}
          onAspectRatioChange={handleAspectRatioChange}
          onDimensionsChange={handleDimensionsChange}
          onQualityChange={handleQualityChange}
          onColorizationChange={handleColorizationChange}
        />
      </Dialog>
    </div>
  );
})

export default CompressImage;